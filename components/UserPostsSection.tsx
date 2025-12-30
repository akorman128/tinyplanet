import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, FlatList, RefreshControl, Text } from "react-native";
import { PostCard } from "@/components/PostCard";
import { TravelPlanCard } from "@/components/TravelPlanCard";
import { useFeed } from "@/hooks/useFeed";
import { useSavedPosts } from "@/hooks/useSavedPosts";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { PostWithAuthor } from "@/types/post";
import { colors, TabBar } from "@/design-system";

// Helper function to detect travel plan posts
const isTravelPlanPost = (post: PostWithAuthor): boolean => {
  return post.text.startsWith("🚀 Traveling to");
};

const POSTS_PER_PAGE = 10;

type PostFilter = "posts" | "saved";

interface UserPostsSectionProps {
  userId: string;
  initialFilter?: PostFilter;
  onOpenComments?: (postId: string, commentCount: number) => void;
  scrollEnabled?: boolean;
  nestedScrollEnabled?: boolean;
}

export function UserPostsSection({
  userId,
  initialFilter = "posts",
  onOpenComments,
  scrollEnabled = true,
  nestedScrollEnabled = false,
}: UserPostsSectionProps) {
  const { getUserPosts } = useFeed();
  const { getSavedPosts } = useSavedPosts();
  const currentUserProfile = useRequireProfile();
  const isOwnProfile = userId === currentUserProfile.id;

  const [activeFilter, setActiveFilter] = useState<PostFilter>(initialFilter);
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch posts for current filter
  const fetchPosts = useCallback(async (isRefresh = false) => {
    if (!isRefresh && loading) return; // Prevent concurrent fetches

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      let data: PostWithAuthor[];
      const currentOffset = isRefresh ? 0 : offset;

      if (activeFilter === "posts") {
        const result = await getUserPosts(userId, {
          limit: POSTS_PER_PAGE,
          offset: currentOffset,
        });
        data = result.data;
      } else {
        const result = await getSavedPosts({
          limit: POSTS_PER_PAGE,
          offset: currentOffset,
        });
        data = result.data;
      }

      setPosts((prev) => (isRefresh ? data : [...prev, ...data]));
      setOffset(isRefresh ? data.length : currentOffset + data.length);
      setHasMore(data.length === POSTS_PER_PAGE);
    } catch (err) {
      console.error(`Error fetching ${activeFilter}:`, err);
      setError(`Failed to load ${activeFilter}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [activeFilter, userId, offset, loading, getUserPosts, getSavedPosts]);

  // Fetch on mount and when filter changes
  useEffect(() => {
    setPosts([]);
    setOffset(0);
    setHasMore(true);
    setLoading(true);
    fetchPosts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, userId]);

  const handleFilterChange = (newFilter: string) => {
    setActiveFilter(newFilter as PostFilter);
  };

  const handleRefresh = () => {
    fetchPosts(true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchPosts();
    }
  };

  const handleLike = (postId: string, updates: Partial<PostWithAuthor>) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, ...updates } : p)));
  };

  const handleSave = (postId: string, updates: Partial<PostWithAuthor>) => {
    // If unsaved in "Saved" filter, remove from list
    if (activeFilter === "saved" && updates.saved_by_user === false) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } else {
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, ...updates } : p)));
    }
  };

  const handleDelete = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleOpenCommentsInternal = (postId: string, commentCount: number) => {
    if (onOpenComments) {
      onOpenComments(postId, commentCount);
    } else {
      console.log("Open comments for post:", postId);
    }
  };

  if (loading && !refreshing) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-gray-500">
          Loading {activeFilter === "posts" ? "posts" : "saved posts"}...
        </Text>
      </View>
    );
  }

  if (error && posts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  const emptyStateMessage =
    activeFilter === "posts"
      ? { title: "No posts yet", subtitle: "Posts will appear here" }
      : {
          title: "No saved posts",
          subtitle: "Posts you save will appear here",
        };

  if (posts.length === 0) {
    return (
      <View className="flex-1">
        {isOwnProfile && (
          <TabBar
            tabs={[
              { id: "posts", label: "Posts" },
              { id: "saved", label: "Saved" },
            ]}
            activeTab={activeFilter}
            onTabChange={handleFilterChange}
          />
        )}
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-gray-900 text-lg font-semibold mb-2">
            {emptyStateMessage.title}
          </Text>
          <Text className="text-gray-500 text-center">
            {emptyStateMessage.subtitle}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {isOwnProfile && (
        <TabBar
          tabs={[
            { id: "posts", label: "Posts" },
            { id: "saved", label: "Saved" },
          ]}
          activeTab={activeFilter}
          onTabChange={handleFilterChange}
        />
      )}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          isTravelPlanPost(item) ? (
            <TravelPlanCard
              post={item}
              onLike={handleLike}
              onSave={handleSave}
              onDelete={handleDelete}
              onOpenComments={handleOpenCommentsInternal}
            />
          ) : (
            <PostCard
              post={item}
              onLike={handleLike}
              onSave={handleSave}
              onDelete={handleDelete}
              onOpenComments={handleOpenCommentsInternal}
            />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.hex.purple600}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        scrollEnabled={scrollEnabled}
        nestedScrollEnabled={nestedScrollEnabled}
      />
    </View>
  );
}
