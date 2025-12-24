import React, { useState, useEffect, useCallback, useRef } from "react";
import { FlatList, RefreshControl, View, ActivityIndicator } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFeed } from "@/hooks/useFeed";
import { PostCard } from "./PostCard";
import { CommentsSheet } from "./CommentsSheet";
import { EmptyState, LoadingState, ErrorState, colors } from "@/design-system";
import { PostWithAuthor } from "@/types/post";

interface FeedViewProps {
  onCommentsSheetChange?: (isOpen: boolean) => void;
}

const PAGE_SIZE = 10;

export function FeedView({ onCommentsSheetChange }: FeedViewProps) {
  const { getFeed } = useFeed();
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  // CommentsSheet state
  const commentsSheetRef = useRef<BottomSheet>(null);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [activeCommentCount, setActiveCommentCount] = useState(0);

  const loadFeed = useCallback(async () => {
    try {
      setError(null);
      const result = await getFeed({ limit: PAGE_SIZE, offset: 0 });
      setPosts(result.data);
      setOffset(PAGE_SIZE);
      setHasMore(result.data.length === PAGE_SIZE);
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

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore || refreshing) return;

    setLoadingMore(true);
    try {
      const result = await getFeed({ limit: PAGE_SIZE, offset });
      setPosts((prev) => [...prev, ...result.data]);
      setOffset((prev) => prev + PAGE_SIZE);
      setHasMore(result.data.length === PAGE_SIZE);
    } catch (err) {
      console.error("Error loading more posts:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [getFeed, offset, loadingMore, hasMore, refreshing]);

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

  const handleOpenComments = useCallback(
    (postId: string, commentCount: number) => {
      setActivePostId(postId);
      setActiveCommentCount(commentCount);
      commentsSheetRef.current?.snapToIndex(0);
    },
    []
  );

  const handleCommentCountChange = useCallback(
    (postId: string, newCount: number) => {
      setActiveCommentCount(newCount);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comment_count: newCount } : p
        )
      );
    },
    []
  );

  const handleCommentsSheetChange = useCallback(
    (index: number) => {
      onCommentsSheetChange?.(index >= 0);
    },
    [onCommentsSheetChange]
  );

  if (loading && !refreshing) {
    return <LoadingState />;
  }

  if (error && !refreshing) {
    return <ErrorState message={error} />;
  }

  if (posts.length === 0 && !loading) {
    return <EmptyState message="Your tiny planet is empty." />;
  }

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color={colors.hex.purple600} />
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onUpdate={handlePostUpdate}
            onDelete={handlePostDelete}
            onOpenComments={handleOpenComments}
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerClassName="pt-36 pb-20"
      />

      {activePostId && (
        <CommentsSheet
          ref={commentsSheetRef}
          postId={activePostId}
          initialCommentCount={activeCommentCount}
          onCommentCountChange={handleCommentCountChange}
          onSheetChange={handleCommentsSheetChange}
        />
      )}
    </>
  );
}
