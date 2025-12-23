import React, { useState, useEffect, useCallback } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useFeed } from "@/hooks/useFeed";
import { PostCard } from "./PostCard";
import { EmptyState, LoadingState, ErrorState, colors } from "@/design-system";
import { PostWithAuthor } from "@/types/post";

export function FeedView() {
  const { getFeed } = useFeed();
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    try {
      setError(null);
      const result = await getFeed({ limit: 50, offset: 0 });
      setPosts(result.data);
    } catch (err) {
      console.error("Error loading feed:", err);
      setError("Failed to load feed");
    } finally {
      setLoading(false);
    }
  }, [getFeed]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadFeed();
    setRefreshing(false);
  };

  const handlePostUpdate = useCallback(
    (postId: string, updates: Partial<PostWithAuthor>) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, ...updates } : p))
      );
    },
    []
  );

  const handlePostDelete = useCallback((postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }, []);

  if (loading && !refreshing) {
    return <LoadingState />;
  }

  if (error && !refreshing) {
    return <ErrorState message={error} />;
  }

  if (posts.length === 0 && !loading) {
    return <EmptyState message="Your tiny planet is empty." />;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onUpdate={handlePostUpdate}
          onDelete={handlePostDelete}
        />
      )}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.hex.purple600}
        />
      }
      contentContainerClassName="pt-36 pb-20"
    />
  );
}
