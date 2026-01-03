# Supabase RPC Functions

> **IMPORTANT**: When creating new RPC functions, always update this file with the function name, migration file, usage location, and description.

## Active RPC Functions

| Function Name | Migration | Used In | Description |
|---|---|---|---|
| `get_feed_posts` | `20251224000002_fix_feed_functions_schema.sql` | `hooks/useFeed.ts` | Fetches paginated feed posts with aggregated like/comment counts and liked_by_user status |
| `get_user_posts` | `20251224000002_fix_feed_functions_schema.sql` | `hooks/useFeed.ts` | Fetches posts from a specific user with aggregated counts |
| `get_friend_locations` | `20251124000002_optimize_location_rpc_functions.sql` | `hooks/useFriends.ts` | Returns geographic coordinates (PostGIS) of all accepted friends |
| `get_mutual_locations_with_connections` | `20251124000004_add_mutual_connections_rpc.sql` | `hooks/useFriends.ts` | Returns mutual friend locations with connecting friend IDs for network graph |
| `count_mutual_friends` | `20251130000001_add_count_mutual_friends_rpc.sql` | Used by `get_profile` RPC | Counts mutual friends between two users using INTERSECT |
| `get_profile` | `20251130000002_add_get_profile_rpc.sql` | `hooks/useProfile.ts` | Returns enriched profile with friend count, mutual friend count, and post count |
| `search_friends` | `20251223000001_add_search_friends_rpc.sql` | `hooks/useFriends.ts` | Server-side friend search using case-insensitive ILIKE pattern matching |
| `get_top_vibes` | `20251223000002_add_get_top_vibes_rpc.sql` | `hooks/useVibe.ts` | Returns N most frequently used emojis in vibes received by a user |
| `get_mutual_friends_between_users` | `20251202000001_add_get_mutual_friends_rpc.sql` | `hooks/useFriends.ts` | Returns complete profile data for all mutual friends between two users |
| `get_message_channels` | `20260103000002_add_message_channels_rpc.sql` | `hooks/useMessageChannels.ts` | Returns all accepted friends with last message preview, timestamp, and server-side calculated unread counts |

## Deprecated/Unused RPCs

| Function Name | Migration | Status | Reason |
|---|---|---|---|
| `top_emojis_for_user` | `20251024000000_remote_schema.sql` | Deprecated | Replaced by `get_top_vibes` with improved implementation |
| `get_mutual_locations` | `20251124000003_add_indexes_optimize_queries.sql` | Superseded | Replaced by `get_mutual_locations_with_connections` which includes connecting friend IDs |

## RPC Development Guidelines

### Security & Permissions
- Use `SECURITY DEFINER` for functions that need to bypass Row Level Security (RLS)
- Always grant `EXECUTE` permission to the `authenticated` role:
  ```sql
  GRANT EXECUTE ON FUNCTION function_name TO authenticated;
  ```

### Naming Conventions
- Use descriptive function names with verbs (`get_`, `count_`, `search_`)
- Use `p_` prefix for parameters (PostgreSQL convention)
- Example: `get_profile(p_user_id UUID, p_current_user_id UUID)`

### Return Types
- Return `TABLE` types for structured data with multiple columns
- Return basic types (`INTEGER`, `BOOLEAN`) for simple computations
- Example:
  ```sql
  RETURNS TABLE(
    id UUID,
    full_name TEXT,
    avatar_url TEXT
  )
  ```

### Performance Best Practices
- Use LEFT JOINs with COUNT DISTINCT for aggregations
- Create indexes on foreign keys and frequently queried columns
- Use PostGIS functions (`ST_X`, `ST_Y`) for geography column extraction
- Implement pagination with `LIMIT` and `OFFSET` parameters

### Common Patterns

#### Feed Query with Aggregations
```sql
SELECT
  p.*,
  COUNT(DISTINCT l.id) AS like_count,
  COUNT(DISTINCT c.id) AS comment_count,
  EXISTS(SELECT 1 FROM likes WHERE user_id = p_user_id AND post_id = p.id) AS liked_by_user
FROM posts p
LEFT JOIN likes l ON p.id = l.post_id
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.id
```

#### Location Extraction (PostGIS)
```sql
SELECT
  id,
  full_name,
  ST_X(location::geometry) AS longitude,
  ST_Y(location::geometry) AS latitude
FROM profiles
```

#### Friend Discovery with CTEs
```sql
WITH user_friends AS (
  SELECT friend_id FROM friendships WHERE user_id = p_user_id
)
SELECT * FROM profiles WHERE id IN (SELECT friend_id FROM user_friends)
```

## Trigger Functions (Not Callable as RPCs)

The following functions are used as database triggers and cannot be called directly:

- `handle_new_user` - Auto-creates profile on user signup
- `handle_updated_at` - Auto-updates `updated_at` timestamp on row changes
- `set_updated_at`, `touch_updated_at`, `trigger_set_updated_at` - Timestamp management utilities
- `normalize_friendship_order` - Ensures bidirectional friendship row ordering (user_a < user_b)

## Adding a New RPC Function

When creating a new RPC function, follow these steps:

1. **Create Migration File**
   ```bash
   # Generate timestamped migration
   npx supabase migration new add_your_function_name_rpc
   ```

2. **Define Function in Migration**
   ```sql
   CREATE OR REPLACE FUNCTION your_function_name(p_param1 UUID, p_param2 TEXT)
   RETURNS TABLE(id UUID, data TEXT)
   LANGUAGE plpgsql
   SECURITY DEFINER
   AS $$
   BEGIN
     RETURN QUERY
     SELECT id, data FROM your_table WHERE user_id = p_param1;
   END;
   $$;

   GRANT EXECUTE ON FUNCTION your_function_name TO authenticated;
   ```

3. **Call from Hook**
   ```typescript
   const { data, error } = await supabase
     .rpc('your_function_name', {
       p_param1: userId,
       p_param2: searchQuery,
     });
   ```

4. **Update This File**
   - Add entry to "Active RPC Functions" table
   - Include migration file name, hook location, and description

## References

- Supabase RPC Documentation: https://supabase.com/docs/guides/database/functions
- PostGIS Functions: https://postgis.net/docs/reference.html
- PostgreSQL PL/pgSQL: https://www.postgresql.org/docs/current/plpgsql.html
