# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tiny Planet** is an invite-only React Native social networking mobile application (iOS & Android) built with Expo and Supabase. Users connect with friends through invite codes, send "vibes" (3-emoji messages), create posts with privacy controls, and invite new users via SMS.

## Tech Stack

- **Mobile**: React Native 0.81.5 + Expo SDK 54 (with new architecture and React Compiler experimental features)
- **Routing**: Expo Router 6.0 (file-based routing with typed routes)
- **Styling**: NativeWind 4.2 (Tailwind CSS for React Native)
- **State**: Zustand 5.0 with AsyncStorage persistence
- **Forms**: React Hook Form 7.66 + Zod 4.1 validation
- **Backend**: Supabase (PostgreSQL with PostGIS, Auth, Row Level Security)
- **Edge Functions**: Deno functions for SMS via Twilio
- **Language**: TypeScript 5.9

## Development Commands

```bash
# Start dev server
npm start

# Clear cache if needed (Metro/Expo issues)
npx expo start --clear --reset-cache

# Platform builds
npm run android
npm run ios

# Linting with auto-fix
npm run lint
```

## Use Context7 by Default

Always use context7 when I need code generation, setup or configuration steps, or library/API documentation. This means you should automatically use the Context7 MCP tools to resolve library id and get library docs without me having to explicitly ask.

## Architecture Patterns

### File-Based Routing Structure

Expo Router uses route groups for auth flow separation:

```
app/
├── _layout.tsx                 # Root layout with auth guard
├── (public)/                   # Unauthenticated routes
│   ├── welcome.tsx
│   ├── sign-in/
│   └── sign-up/               # Multi-step signup flow
│       ├── index.tsx
│       ├── invite-code.tsx    # Step 1: Validate invite
│       ├── location-permission.tsx
│       ├── user-details.tsx
│       ├── phone-number.tsx
│       └── verify-otp.tsx     # Final step
└── (protected)/               # Authenticated routes
    ├── onboarding/
    │   └── send-invites.tsx
    └── (tabs)/                # Main app tabs
        └── index.tsx
```

**Key Pattern**: `Stack.Protected` guards routes based on session state from `useSupabase` hook.

### Data Layer: Custom Hooks Pattern

All data operations are encapsulated in custom hooks following a consistent pattern:

**Core Hooks** (`/hooks/`):

- `useSupabase` - Auth & Supabase client
- `useProfile` - User profiles (get, create, update)
- `useFriends` - Friend relationships (get, create, accept, reject)
- `useVibe` - Vibe (emoji) messages (get, create, link to invite)
- `useInviteCodes` - Invite code management (validate, create, send SMS)
- `usePosts` - Post CRUD with visibility controls
- `useComments` - Comment operations
- `useLikes` - Like/unlike posts or comments
- `useSignUp` - Multi-step signup orchestration

**Hook Pattern**:

- Queries prefixed with `get` (e.g., `getProfile`, `getFriends`)
- Mutations for create/update/delete operations
- DTOs (Data Transfer Objects) for type safety
- Callbacks wrapped in `useCallback` for optimization

**Example**:

```typescript
const { getProfile, createProfile, updateProfile } = useProfile();

await createProfile({
  id: userId,
  phone_number: phone,
  full_name: name,
  birthday: new Date(birthday),
  hometown: hometown,
});
```

### State Management with Zustand

**Global Stores**:

- `profileStore` - Current user profile (persisted)
- `signupStore` - Multi-step signup form data (persisted)

**Pattern**: All stores use Zustand's persist middleware with AsyncStorage for automatic persistence across app restarts.

```typescript
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profileState: null,
      setProfileState: (profileState) => set({ profileState }),
      removeProfile: () => set({ profileState: null }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### Design System Components

Centralized UI components in `/design-system/`:

- `Button` - Primary/Secondary variants with disabled states
- `Input` - Form inputs with labels, errors, character count
- `Typography` - Text components
- `colors.ts` - Purple-themed color palette

All components use NativeWind (Tailwind) for styling.

### Form Validation Pattern

**Stack**: React Hook Form + Zod schemas + `@hookform/resolvers`

```typescript
const schema = z.object({
  inviteCode: z.string().min(1, "Required").trim(),
});

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
  mode: "all",
});
```

**Integration with Design System**:

```tsx
<Controller
  control={control}
  name="inviteCode"
  render={({ field }) => (
    <Input {...field} error={errors.inviteCode?.message} />
  )}
/>
```

### Multi-Step Form Pattern

For signup flow (5 steps: invite code → location → details → phone → OTP):

1. **State Persistence**: `signupStore` (Zustand) persists form data across steps
2. **Navigation**: Expo Router for step transitions
3. **Validation**: Each step validates independently before allowing navigation
4. **Cleanup**: Store cleared after successful completion

## Database Architecture

### Core Tables

- **profiles**: User profiles with location (PostGIS POINT), `invited_by` tracking
- **friendships**: Bidirectional relationships (user_a, user_b, status)
- **vibes**: 3-emoji messages between users (with optional `invite_code_id` for linking)
- **invite_codes**: Invite system (code, status, expiry, redeemed_by)
- **posts**: User posts with visibility enum (friends/mutuals/public)
- **comments**: Nested comments with `parent_comment_id`
- **likes**: Polymorphic likes (post_id OR comment_id, not both)

### Row Level Security (RLS)

All tables have RLS enabled with friend-based access control:

- Users can only modify their own content
- Complex visibility policies for posts (friends/mutuals/public require JOIN queries)
- Friend-based access throughout (vibes only visible to sender/recipient and their friends)

### Database Conventions

- **Bidirectional friendships**: Single row represents friendship (user_a < user_b constraint)
- **Polymorphic likes**: Single table with post_id OR comment_id (CHECK constraint)
- **Soft references**: `invite_code_id` in vibes allows tracking invite origin
- **Migrations**: Located in `/supabase/migrations/`, timestamped naming
- **Indexes**: All foreign keys and frequently queried columns indexed

## Authentication Flow

**Provider**: Supabase Auth with Phone (SMS OTP)

**Signup Flow** (invite-only):

1. User enters invite code → validated against database
2. Location permission requested (optional)
3. User details collected (name, birthday, hometown)
4. Phone number + SMS OTP verification
5. Profile creation with automatic friend relationship to inviter
6. Vibe linking (if inviter sent vibes via invite code)

**Session Management**:

- Context: `SupabaseContext` provides session state
- Hook: `useSupabase` returns `{ session, isLoaded, signOut }`
- Guard: `Stack.Protected` routes require valid session
- Persistence: AsyncStorage via Supabase client config
- Auto-refresh: Tokens refreshed on app state changes

## Key Conventions

### Path Aliases

```typescript
// Configured in tsconfig.json & babel.config.js
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/design-system";
```

### TypeScript Conventions

- **Interfaces**: Data models (Profile, Friendship, Vibe, Post, etc.)
- **DTOs**: Input/output types (CreateProfileDto, GetProfileDto)
- **Enums**: Status fields (FriendshipStatus, InviteCodeStatus, PostVisibility)
- **Type exports**: Centralized in `/types/` directory

### File Naming

- Components: PascalCase (`Button.tsx`)
- Hooks: camelCase with `use` prefix (`useProfile.ts`)
- Types: camelCase (`profile.ts`, `friendship.ts`)
- Routes: kebab-case (`invite-code.tsx`)

### Component Organization

**components/** - Feature-specific components containing Tiny Planet business logic (posts, vibes, friends) and data fetching hooks.

**design-system/** - Generic presentational UI primitives with no business logic that could be reused in any app.

## Important Architectural Decisions

1. **Invite-only system**: All signups require valid invite code (checked before phone verification)
2. **Auto-friending**: Creating profile automatically creates accepted friendship with inviter
3. **Vibe linking**: Pre-created vibes (emojis) can be linked to user during signup via `invite_code_id`
4. **Location tracking**: PostGIS POINT for current location
5. **Multi-step onboarding**: Progressive data collection with persisted state

## Environment Setup

Required environment variables in `.env`:

```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_KEY=
```

For Edge Functions (SMS via Twilio):

```
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

## Supabase Edge Functions

- **send-invite-sms**: Deno function in `/supabase/functions/send-invite-sms/`
- Sends SMS invites via Twilio integration
- Called via `useInviteCodes` hook: `sendInviteCode({ phone_number, invite_code, inviter_name })`

## Code Quality Standards

- **Prettier**: 2-space indentation, semicolons, double quotes, 80 char width
- **ESLint**: Expo config with TypeScript support
- **Type Safety**: Heavy use of TypeScript, Zod validation, DTOs throughout
- **Error Handling**: Try-catch in hooks, error states in forms
- **Optimization**: `useMemo`/`useCallback` for Supabase client and hook callbacks

## Styling Guidelines

**IMPORTANT**: Always use **NativeWind (Tailwind CSS)** for styling instead of StyleSheet.

- ✅ **Preferred**: `<View className="flex-1 bg-white pt-12">`
- ❌ **Avoid**: `<View style={styles.container}>` with `StyleSheet.create()`

**When to use NativeWind**:
- All new components and screens
- Refactoring existing components
- Layout (flexbox, spacing, sizing)
- Colors (use design system color tokens when available)
- Typography (text sizes, weights, colors)
- Borders, shadows, and visual effects

**Exceptions** (rare cases where StyleSheet may be needed):
- Complex platform-specific styles that can't be expressed with Tailwind utilities
- Dynamic styles that require runtime calculations

**Migration Priority**: When editing existing files that use StyleSheet (like `edit-profile.tsx`), consider migrating to NativeWind if time permits, but prioritize the main task first.
