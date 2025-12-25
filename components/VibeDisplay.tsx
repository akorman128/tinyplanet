import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Modal, TextInput, Alert } from "react-native";
import { colors, Button, Icons } from "@/design-system";
import { useVibe } from "@/hooks/useVibe";
import { useRequireProfile } from "@/hooks/useRequireProfile";

interface VibeDisplayProps {
  topVibes: { emoji: string; count: number }[];
  totalVibeCount?: number;
  onPress?: () => void;
  recipientId?: string;
  onVibeCreated?: () => void;
}

export const VibeDisplay: React.FC<VibeDisplayProps> = ({
  topVibes,
  totalVibeCount,
  onPress,
  recipientId,
  onVibeCreated,
}) => {
  const profile = useRequireProfile();
  const { hasGivenVibe, createVibe, isLoaded } = useVibe();
  const [hasUserGivenVibe, setHasUserGivenVibe] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emojiInput, setEmojiInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if current user has given a vibe to this recipient
  useEffect(() => {
    const checkUserVibe = async () => {
      if (!recipientId || !isLoaded) return;

      try {
        const hasGiven = await hasGivenVibe(recipientId);
        setHasUserGivenVibe(hasGiven);
      } catch (error) {
        console.error("Error checking user vibe:", error);
      }
    };

    checkUserVibe();
  }, [recipientId, hasGivenVibe, isLoaded]);

  const handleAddVibe = () => {
    setShowModal(true);
  };

  const handleSubmitVibe = async () => {
    if (!recipientId) return;

    // Extract emojis from the input string
    const emojiRegex = /\p{Emoji}/gu;
    const emojis = emojiInput.match(emojiRegex) || [];

    if (emojis.length !== 3) {
      Alert.alert("Invalid Vibe", "Please enter exactly 3 emojis");
      return;
    }

    setIsSubmitting(true);
    try {
      await createVibe({
        receiverId: recipientId,
        emojis: emojis,
      });

      setShowModal(false);
      setEmojiInput("");
      setHasUserGivenVibe(true);
      onVibeCreated?.();
    } catch (error) {
      console.error("Error creating vibe:", error);
      Alert.alert("Error", "Failed to send vibe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <View className="mb-6 items-center w-full">
        <Pressable className="mb-6 items-center w-full" onPress={onPress}>
          <Text
            className="text-sm font-semibold uppercase mb-2"
            style={{ color: colors.hex.placeholder, letterSpacing: 0.5 }}
          >
            Vibe (
            {totalVibeCount && totalVibeCount > 10 ? "10+" : totalVibeCount})
          </Text>
          <View className="flex-row flex-wrap gap-4 justify-center items-center">
            {topVibes.map(({ emoji, count }) => (
              <View key={emoji} className="relative">
                <Text className="text-[32px]">{emoji}</Text>
                {count > 1 && (
                  <View
                    className="absolute -top-1 -right-1 rounded-full min-w-[20px] h-5 justify-center items-center px-1.5"
                    style={{ backgroundColor: colors.primary.DEFAULT }}
                  >
                    <Text className="text-xs font-bold text-white">
                      {count}
                    </Text>
                  </View>
                )}
              </View>
            ))}
            {!hasUserGivenVibe && recipientId !== profile.id && (
              <Pressable
                onPress={handleAddVibe}
                className="w-8 h-8 rounded-full border-2 justify-center items-center"
              >
                <Icons.plus />
              </Pressable>
            )}
          </View>
        </Pressable>
      </View>

      {/* Vibe Creation Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-6 w-[85%] max-w-md">
            <Text className="text-xl font-bold text-purple-900 mb-4">
              Add a Vibe
            </Text>
            <Text className="text-sm text-gray-600 mb-4">
              Enter 3 emojis to send as your vibe
            </Text>
            <TextInput
              value={emojiInput}
              onChangeText={setEmojiInput}
              placeholder="😊🎉✨"
              className="border border-gray-300 rounded-lg p-4 text-2xl mb-6"
              style={{ borderColor: colors.hex.gray300 }}
              maxLength={20}
              autoFocus
            />
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button
                  variant="secondary"
                  onPress={() => {
                    setShowModal(false);
                    setEmojiInput("");
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </View>
              <View className="flex-1">
                <Button onPress={handleSubmitVibe} disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
