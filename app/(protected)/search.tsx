import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
  RefreshControl,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { colors, Input, Button, Heading, Body, Caption } from "@/design-system";
import { TabBar, Tab } from "@/components/TabBar";
import { UserSearchListItem } from "@/components/UserSearchList";
import { FriendRequestItem } from "@/components/FriendRequestItem";
import { VibePhoneForm } from "@/components/VibePhoneForm";
import { useFriends } from "@/hooks/useFriends";
import { useVibe } from "@/hooks/useVibe";
import { useInviteCodes } from "@/hooks/useInviteCodes";
import { useProfileStore } from "@/stores/profileStore";
import { FriendWithRelationship, PendingRequest } from "@/types/friendship";
import { useContactPicker } from "@/hooks/useContactPicker";
import { isValidVibe, extractEmojis } from "@/utils/emojiValidation";
import { formatPhoneNumber } from "@/utils";

type TabId = "find" | "requests" | "invite";

const TABS: Tab[] = [
  { id: "find", label: "Find Friends" },
  { id: "requests", label: "Requests" },
  { id: "invite", label: "Invite" },
];

const vibeFormSchema = z.object({
  emojis: z
    .string()
    .min(1, "Please enter 3 emojis")
    .refine((val) => isValidVibe(val), {
      message: "Please enter exactly 3 emojis",
    }),
  phone: z.string().min(10, "Phone number is required"),
});

export default function SearchScreen() {
  const router = useRouter();
  const { profileState } = useProfileStore();
  const [activeTab, setActiveTab] = useState<TabId>("find");
  const [refreshing, setRefreshing] = useState(false);

  // Find Users tab state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FriendWithRelationship[]>(
    []
  );
  const [searchLoading, setSearchLoading] = useState(false);

  // Requests tab state
  const [incomingRequests, setIncomingRequests] = useState<PendingRequest[]>(
    []
  );
  const [requestsLoading, setRequestsLoading] = useState(false);

  // Send Vibe forms (2 forms like send-invites.tsx)
  const form1 = useForm({
    resolver: zodResolver(vibeFormSchema),
    defaultValues: { emojis: "", phone: "" },
    mode: "all",
  });

  const form2 = useForm({
    resolver: zodResolver(vibeFormSchema),
    defaultValues: { emojis: "", phone: "" },
    mode: "all",
  });

  const forms = [form1, form2];
  const [isSending, setIsSending] = useState(false);

  // Invite limit tracking (3 per month)
  const [invitesUsedThisMonth, setInvitesUsedThisMonth] = useState(0);
  const MONTHLY_INVITE_LIMIT = 3;
  const invitesRemaining = MONTHLY_INVITE_LIMIT - invitesUsedThisMonth;

  // Check if both forms are valid
  const allFormsValid = form1.formState.isValid && form2.formState.isValid;

  const {
    searchFriendsAndMutuals,
    getPendingRequests,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
  } = useFriends();
  const { createVibe } = useVibe();
  const { createInviteCode, sendInviteCode, getInviteCountThisMonth } =
    useInviteCodes();
  const { pickContact: pickContactFromDevice } = useContactPicker();

  const loadPendingRequests = useCallback(async () => {
    try {
      setRequestsLoading(true);
      const { incoming } = await getPendingRequests();
      setIncomingRequests(incoming);
    } catch (error) {
      console.error("Error loading pending requests:", error);
      Alert.alert("Error", "Failed to load friend requests");
    } finally {
      setRequestsLoading(false);
    }
  }, [getPendingRequests]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const { data } = await searchFriendsAndMutuals({ query: searchQuery });
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching users:", error);
      Alert.alert("Error", "Failed to search users");
    } finally {
      setSearchLoading(false);
    }
  }, [searchQuery, searchFriendsAndMutuals]);

  // Load invite count
  const loadInviteCount = useCallback(async () => {
    try {
      const count = await getInviteCountThisMonth();
      setInvitesUsedThisMonth(count);
    } catch (error) {
      console.error("Error loading invite count:", error);
    }
  }, [getInviteCountThisMonth]);

  // Preload pending requests and invite count once on mount
  useEffect(() => {
    loadPendingRequests();
    loadInviteCount();
  }, []);

  // Debounced search (500ms)
  useEffect(() => {
    if (activeTab !== "find") return;

    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, activeTab, handleSearch]);

  const handleAddFriend = useCallback(
    async (userId: string) => {
      try {
        await sendFriendRequest({ targetUserId: userId });
        Alert.alert("Success", "Friend request sent!");
        handleSearch();
      } catch (error) {
        console.error("Error sending friend request:", error);
        Alert.alert("Error", "Failed to send friend request");
      }
    },
    [sendFriendRequest, handleSearch]
  );

  const handleAcceptRequest = useCallback(
    async (userId: string) => {
      try {
        await acceptFriendRequest({ fromUserId: userId });
        Alert.alert("Success", "Friend request accepted!");
        loadPendingRequests();
      } catch (error) {
        console.error("Error accepting friend request:", error);
        Alert.alert("Error", "Failed to accept friend request");
      }
    },
    [acceptFriendRequest, loadPendingRequests]
  );

  const handleDeclineRequest = useCallback(
    async (userId: string) => {
      try {
        await declineFriendRequest({ targetUserId: userId });
        loadPendingRequests();
      } catch (error) {
        console.error("Error declining friend request:", error);
        Alert.alert("Error", "Failed to decline friend request");
      }
    },
    [declineFriendRequest, loadPendingRequests]
  );

  const pickContact = async (formIndex: number) => {
    const phoneNumber = await pickContactFromDevice();
    if (phoneNumber) {
      forms[formIndex].setValue("phone", phoneNumber, { shouldValidate: true });
    }
  };

  const sendAllInvites = async () => {
    if (!allFormsValid) {
      Alert.alert("Incomplete", "Please fill out both invite forms");
      return;
    }

    // Check invite limit (user is sending 2 invites)
    if (invitesRemaining < 2) {
      Alert.alert(
        "Invite Limit Reached",
        `You only have ${invitesRemaining} invite${invitesRemaining === 1 ? "" : "s"} remaining this month. You can send up to ${MONTHLY_INVITE_LIMIT} invites per month.`
      );
      return;
    }

    setIsSending(true);

    try {
      const formData = [form1.getValues(), form2.getValues()];

      // Process both invites in parallel
      const sendPromises = formData.map(async (data) => {
        const emojiArray = extractEmojis(data.emojis);
        const phoneNumber = formatPhoneNumber(data.phone);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        const { data: inviteCodeData, code } = await createInviteCode({
          expires_at: expiresAt,
        });

        await createVibe({
          receiverId: null,
          emojis: emojiArray,
          inviteCodeId: inviteCodeData.id,
        });

        await sendInviteCode({
          phone_number: phoneNumber,
          invite_code: code,
          inviter_name: profileState?.full_name,
        });
      });

      await Promise.all(sendPromises);

      Alert.alert("Success", "Vibes and invites sent successfully!");

      // Reset both forms
      form1.reset();
      form2.reset();

      // Reload invite count
      await loadInviteCount();
    } catch (error: any) {
      console.error("Error sending invites:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to send invites. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    if (activeTab === "find" && searchQuery.trim()) {
      await handleSearch();
    } else if (activeTab === "requests") {
      await loadPendingRequests();
    }
    setRefreshing(false);
  }, [activeTab, searchQuery, handleSearch, loadPendingRequests]);

  const renderFindUsersTab = () => (
    <View className="flex-1">
      <View className="p-6 gap-3">
        <Input
          placeholder="Search by name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearable={true}
          onClear={() => setSearchQuery("")}
        />
      </View>

      {searchLoading ? (
        <View className="flex-1 justify-center items-center px-6">
          <ActivityIndicator size="large" color={colors.hex.purple600} />
        </View>
      ) : searchResults.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Body className="text-base text-gray-400 text-center">
            {searchQuery.trim() ? "No results" : "Search your planet by name"}
          </Body>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <UserSearchListItem user={item} onAddFriend={handleAddFriend} />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View className="h-[1px] bg-gray-100 mx-6" />
          )}
          contentContainerClassName="pb-6"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );

  const renderRequestsTab = () => (
    <View className="flex-1">
      {requestsLoading ? (
        <View className="flex-1 justify-center items-center px-6">
          <ActivityIndicator size="large" color={colors.hex.purple600} />
        </View>
      ) : incomingRequests.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Body className="text-base text-gray-400 text-center">
            No incoming requests
          </Body>
        </View>
      ) : (
        <FlatList
          data={incomingRequests}
          renderItem={({ item }) => (
            <FriendRequestItem
              request={item}
              onAccept={handleAcceptRequest}
              onDecline={handleDeclineRequest}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View className="h-[1px] bg-gray-100 mx-6" />
          )}
          contentContainerClassName="pb-6"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );

  const renderInviteTab = () => (
    <View className="flex-1">
      <View className="p-6 gap-6">
        {/* Invite limit display */}
        <View className="bg-purple-50 p-4 rounded-lg">
          <Caption className="text-purple-900 font-medium text-center">
            {invitesRemaining > 0
              ? `${invitesRemaining} of ${MONTHLY_INVITE_LIMIT} invites remaining this month`
              : `No invites remaining this month (${MONTHLY_INVITE_LIMIT} limit)`}
          </Caption>
        </View>

        <VibePhoneForm
          control={form1.control}
          vibeError={form1.formState.errors?.emojis?.message}
          phoneError={form1.formState.errors?.phone?.message}
          onSelectContact={() => pickContact(0)}
          showContactPicker={true}
          maxLength={3}
        />
        <Button
          variant="primary"
          onPress={sendAllInvites}
          disabled={!allFormsValid || isSending || invitesRemaining < 2}
          className="mt-2"
        >
          {isSending ? "Sending..." : "Send Invites"}
        </Button>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-12">
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-100">
          <Pressable onPress={() => router.back()} className="py-2 pr-3">
            <Body className="text-base font-semibold text-purple-600">
              ← Back
            </Body>
          </Pressable>
          <Heading className="text-xl font-bold">Search</Heading>
          <View className="w-[60px]" />
        </View>

        {/* Tabs */}
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as TabId)}
        />

        {/* Tab Content */}
        {activeTab === "find" && renderFindUsersTab()}
        {activeTab === "requests" && renderRequestsTab()}
        {activeTab === "invite" && renderInviteTab()}
      </View>
    </>
  );
}
