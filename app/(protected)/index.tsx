import React, { useState, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import { MapView } from "@/components/MapView";
import { FeedView } from "@/components/FeedView";
import { MessagesView } from "@/components/MessagesView";
import { CreateSheet } from "@/components/CreateSheet";
import { Avatar, Icons } from "@/design-system";
import { ButtonGroup } from "@/design-system/ButtonGroup";
import { useProfileStore } from "@/stores/profileStore";
import { colors } from "@/design-system/colors";
import { PostVisibility } from "@/types/post";

type ViewMode = "map" | "feed" | "messages";

interface EditPost {
  id: string;
  text: string;
  visibility: PostVisibility;
}

export default function Page() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [activeView, setActiveView] = useState<ViewMode>("map");
  const [isCreatePostSheetOpen, setIsCreatePostSheetOpen] = useState(false);
  const [isCommentsSheetOpen, setIsCommentsSheetOpen] = useState(false);
  const [editPost, setEditPost] = useState<EditPost | undefined>(undefined);
  const router = useRouter();
  const { profileState } = useProfileStore();
  const createPostSheetRef = useRef<BottomSheet>(null);

  const onRefreshComplete = () => {
    setRefreshing(false);
  };

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleSearchPress = () => {
    router.push("/search");
  };

  const handlePostCreated = () => {
    // Refresh feed after post creation
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 100);
  };

  const handlePostUpdated = () => {
    // Refresh feed after post update
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 100);
    setEditPost(undefined);
  };

  const handleEditPost = (post: EditPost) => {
    setEditPost(post);
    createPostSheetRef.current?.snapToIndex(0);
  };

  const handleSheetChange = (index: number) => {
    setIsCreatePostSheetOpen(index >= 0);
    // Clear edit post when sheet closes
    if (index < 0) {
      setEditPost(undefined);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1">
        {/* Map, Feed, or Messages View */}
        {activeView === "map" ? (
          <MapView onRefresh={onRefreshComplete} refreshing={refreshing} />
        ) : activeView === "feed" ? (
          <FeedView
            key={refreshing ? "refreshing" : "idle"}
            onCommentsSheetChange={setIsCommentsSheetOpen}
            onEditPost={handleEditPost}
          />
        ) : (
          <MessagesView />
        )}

        {/* Toggle Buttons (Centered Top) */}
        <View
          className="absolute left-0 right-0 flex-row justify-center px-20 z-10"
          style={{ top: insets.top + 20 }}
        >
          <ButtonGroup
            activeIndex={
              activeView === "map" ? 0 : activeView === "feed" ? 1 : 2
            }
            options={[
              {
                icon: Icons.globe,
                onPress: () => setActiveView("map"),
              },
              {
                icon: Icons.posts,
                onPress: () => setActiveView("feed"),
              },
              {
                icon: Icons.messageOutline,
                onPress: () => setActiveView("messages"),
              },
            ]}
          />
        </View>

        {/* Profile Button (Top Left) */}
        <TouchableOpacity
          className="absolute left-5 w-12 h-12 rounded-full justify-center items-center z-10"
          style={{
            top: insets.top + 20,
            backgroundColor: colors.hex.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPress={handleProfilePress}
        >
          <Avatar
            fullName={profileState?.full_name || ""}
            avatarUrl={profileState?.avatar_url}
            size="small"
          />
        </TouchableOpacity>

        {/* Search Button (Top Right) */}
        <TouchableOpacity
          className="absolute right-5 w-12 h-12 rounded-full bg-white opacity-70 justify-center items-center z-10"
          style={{
            top: insets.top + 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPress={handleSearchPress}
        >
          <Icons.search size={64} color="black" />
        </TouchableOpacity>

        {/* Floating + Button (Feed Only) */}
        {activeView === "feed" &&
          !isCreatePostSheetOpen &&
          !isCommentsSheetOpen && (
            <TouchableOpacity
              className="absolute bottom-8 right-5 w-14 h-14 rounded-full bg-purple-600 justify-center items-center z-10"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
              onPress={() => createPostSheetRef.current?.snapToIndex(0)}
            >
              <Icons.plus size={28} color="white" />
            </TouchableOpacity>
          )}

        {/* Create Content Bottom Sheet */}
        <CreateSheet
          ref={createPostSheetRef}
          initialType="post"
          editPost={editPost}
          onPostCreated={handlePostCreated}
          onPostUpdated={handlePostUpdated}
          onSheetChange={handleSheetChange}
        />
      </View>
    </GestureHandlerRootView>
  );
}
