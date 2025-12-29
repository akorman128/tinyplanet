import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, FlatList, RefreshControl, Text } from "react-native";
import { PostCard } from "@/components/PostCard";
import { useFeed } from "@/hooks/useFeed";
import { useSavedPosts } from "@/hooks/useSavedPosts";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { PostWithAuthor } from "@/types/post";
import { colors, TabBar } from "@/design-system";

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
  const { getUserPosts, isLoaded: feedIsLoaded } = useFeed();
  const { getSavedPosts, isLoaded: savedIsLoaded } = useSavedPosts();
  const currentUserProfile = useRequireProfile();
  const isOwnProfile = userId === currentUserProfile.id;

  const [activeFilter, setActiveFilter] = useState<PostFilter>(initialFilter);
  const [error, setError] = useState<string | null>(null);

  // Track if we've fetched for each filter to prevent duplicate fetches
  const hasFetchedRef = useRef({ posts: false, saved: false });

  // Separate state for each filter
  const [postsData, setPostsData] = useState({
    posts: [] as PostWithAuthor[],
    offset: 0,
    hasMore: true,
    loading: true,
    refreshing: false,
  });

  const [savedData, setSavedData] = useState({
    posts: [] as PostWithAuthor[],
    offset: 0,
    hasMore: true,
    loading: true,
    refreshing: false,
  });

  const fetchPosts = useCallback(
    async (isRefresh = false) => {
      const isFeedLoaded = activeFilter === "posts" ? feedIsLoaded : savedIsLoaded;
      if (!isFeedLoaded) return;

      const setData = activeFilter === "posts" ? setPostsData : setSavedData;

      // Mark that we've initiated a fetch for this filter
      if (!isRefresh) {
        hasFetchedRef.current[activeFilter] = true;
      }

      // Set loading states and get current offset from state
      let currentOffset = 0;
      setData((prev) => {
        currentOffset = isRefresh ? 0 : prev.offset;
        return isRefresh
          ? { ...prev, refreshing: true }
          : { ...prev, loading: true };
      });

      setError(null);

      try {
        let data: PostWithAuthor[];

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

        setData((prev) => ({
          posts: isRefresh ? data : [...prev.posts, ...data],
          offset: isRefresh ? data.length : currentOffset + data.length,
          hasMore: data.length === POSTS_PER_PAGE,
          loading: false,
          refreshing: false,
        }));
      } catch (err) {
        console.error(`Error fetching ${activeFilter}:`, err);
        setError(`Failed to load ${activeFilter}`);
        setData((prev) => ({ ...prev, loading: false, refreshing: false }));
      }
    },
    [activeFilter, userId, feedIsLoaded, savedIsLoaded, getUserPosts, getSavedPosts]
  );

  // Initial fetch on mount and when filter changes (if not yet fetched)
  useEffect(() => {
    if (!hasFetchedRef.current[activeFilter]) {
      fetchPosts();
    }
  }, [activeFilter, fetchPosts]);

  const handleFilterChange = (newFilter: string) => {
    setActiveFilter(newFilter as PostFilter);
  };

  const handleRefresh = () => {
    fetchPosts(true);
  };

  const handleLoadMore = () => {
    const currentData = activeFilter === "posts" ? postsData : savedData;
    if (!currentData.loading && currentData.hasMore) {
      fetchPosts();
    }
  };

  const handleLike = (postId: string, updates: Partial<PostWithAuthor>) => {
    const setData = activeFilter === "posts" ? setPostsData : setSavedData;
    setData((prev) => ({
      ...prev,
      posts: prev.posts.map((p) => (p.id === postId ? { ...p, ...updates } : p)),
    }));
  };

  const handleSave = (postId: string, updates: Partial<PostWithAuthor>) => {
    const setData = activeFilter === "posts" ? setPostsData : setSavedData;
    setData((prev) => ({
      ...prev,
      posts: prev.posts.map((p) => (p.id === postId ? { ...p, ...updates } : p)),
    }));

    // If unsaved in "Saved" filter, remove from list
    if (activeFilter === "saved" && updates.saved_by_user === false) {
      setSavedData((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p.id !== postId),
      }));
    }
  };

  const handleDelete = (postId: string) => {
    const setData = activeFilter === "posts" ? setPostsData : setSavedData;
    setData((prev) => ({
      ...prev,
      posts: prev.posts.filter((p) => p.id !== postId),
    }));
  };

  const handleOpenCommentsInternal = (
    postId: string,
    commentCount: number
  ) => {
    if (onOpenComments) {
      onOpenComments(postId, commentCount);
    } else {
      console.log("Open comments for post:", postId);
    }
  };

  // Get active data based on filter
  const activeData = activeFilter === "posts" ? postsData : savedData;

  if (activeData.loading && !activeData.refreshing) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-gray-500">
          Loading {activeFilter === "posts" ? "posts" : "saved posts"}...
        </Text>
      </View>
    );
  }

  if (error && activeData.posts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  const emptyStateMessage =
    activeFilter === "posts"
      ? { title: "No posts yet", subtitle: "Posts will appear here" }
      : { title: "No saved posts", subtitle: "Posts you save will appear here" };

  if (activeData.posts.length === 0) {
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
        data={activeData.posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={handleLike}
            onSave={handleSave}
            onDelete={handleDelete}
            onOpenComments={handleOpenCommentsInternal}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={activeData.refreshing}
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
