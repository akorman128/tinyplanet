import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, RefreshControl, Text } from "react-native";
import { PostCard } from "@/components/PostCard";
import { useSavedPosts } from "@/hooks/useSavedPosts";
import { PostWithAuthor } from "@/types/post";
import { colors } from "@/design-system";

const POSTS_PER_PAGE = 10;

export function SavedPostsSection() {
  const { getSavedPosts, isLoaded } = useSavedPosts();
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchPosts = useCallback(
    async (isRefresh = false) => {
      if (!isLoaded) return;

      const currentOffset = isRefresh ? 0 : offset;
      if (isRefresh) {
        setRefreshing(true);
        setPosts([]);
        setOffset(0);
        setHasMore(true);
      } else {
        setLoading(true);
      }

      setError(null);

      try {
        const { data } = await getSavedPosts({
          limit: POSTS_PER_PAGE,
          offset: currentOffset,
        });

        if (isRefresh) {
          setPosts(data);
        } else {
          setPosts((prev) => [...prev, ...data]);
        }

        setHasMore(data.length === POSTS_PER_PAGE);
        if (!isRefresh) {
          setOffset(currentOffset + data.length);
        } else {
          setOffset(data.length);
        }
      } catch (err) {
        console.error("Error fetching saved posts:", err);
        setError("Failed to load saved posts");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [isLoaded, getSavedPosts, offset]
  );

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    fetchPosts(true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchPosts();
    }
  };

  const handleLike = (postId: string, updates: Partial<PostWithAuthor>) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, ...updates } : p))
    );
  };

  const handleSave = (postId: string, updates: Partial<PostWithAuthor>) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, ...updates } : p))
    );

    // If unsaved, remove from list
    if (updates.saved_by_user === false) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  const handleDelete = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleOpenComments = (postId: string) => {
    // This will be handled by the parent screen if needed
    // For now, we'll just log it
    console.log("Open comments for post:", postId);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-gray-500">Loading saved posts...</Text>
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

  if (posts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-gray-900 text-lg font-semibold mb-2">
          No saved posts
        </Text>
        <Text className="text-gray-500 text-center">
          Posts you save will appear here
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onLike={handleLike}
          onSave={handleSave}
          onDelete={handleDelete}
          onOpenComments={handleOpenComments}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.hex.purple600}
        />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      className="flex-1"
    />
  );
}
