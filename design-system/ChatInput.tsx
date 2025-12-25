import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons, colors } from "@/design-system";

interface ChatInputProps {
  onSend: (text: string) => void;
  onTyping?: () => void;
  editingMessage?: { id: string; text: string } | null;
  onCancelEdit?: () => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onTyping,
  editingMessage,
  onCancelEdit,
  placeholder = "Yap city population you...",
}) => {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");
  const inputRef = useRef<TextInput>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Populate input when editing
  useEffect(() => {
    if (editingMessage) {
      setText(editingMessage.text);
      inputRef.current?.focus();
    }
  }, [editingMessage]);

  const handleChangeText = (newText: string) => {
    setText(newText);

    // Debounced typing indicator
    if (onTyping) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      onTyping();
      typingTimeoutRef.current = setTimeout(() => {
        // Stop typing indicator after 2 seconds
      }, 2000);
    }
  };

  const handleSend = () => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    onSend(trimmedText);
    setText("");

    if (editingMessage && onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleCancel = () => {
    setText("");
    onCancelEdit?.();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View
        className="border-t border-gray-200 bg-white px-4 py-4"
        style={{ paddingBottom: insets.bottom + 8 }}
      >
        {editingMessage && (
          <View className="flex-row items-center justify-between mb-2 pb-2 border-b border-gray-200">
            <Text className="text-sm text-purple-600">Editing message</Text>
            <Pressable onPress={handleCancel}>
              <Icons.close size={20} color={colors.hex.gray600} />
            </Pressable>
          </View>
        )}
        <View className="flex-row items-center gap-2">
          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.hex.placeholder}
            multiline
            maxLength={1000}
            className="flex-1 bg-gray-100 rounded-lg px-4 py-4 max-h-24"
            style={{ fontSize: 16 }}
          />
          <Pressable
            onPress={handleSend}
            disabled={!text.trim()}
            className={`w-12 h-12 rounded-lg items-center justify-center ${
              text.trim() ? "bg-purple-600" : "bg-gray-300"
            }`}
          >
            <Icons.send
              size={20}
              color={text.trim() ? colors.hex.white : colors.hex.gray500}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
