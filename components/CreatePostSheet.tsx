import React, { forwardRef, useState, useEffect } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, Icons, colors } from "@/design-system";
import { usePosts } from "@/hooks/usePosts";
import { PostVisibility } from "@/types/post";

const createPostSchema = z.object({
  text: z.string().min(1, "Post cannot be empty").max(500, "Post is too long"),
});

interface EditPost {
  id: string;
  text: string;
  visibility: PostVisibility;
}

interface CreatePostSheetProps {
  editPost?: EditPost;
  onPostCreated?: () => void;
  onPostUpdated?: () => void;
  onSheetChange?: (index: number) => void;
}

export const CreatePostSheet = forwardRef<BottomSheet, CreatePostSheetProps>(
  ({ editPost, onPostCreated, onPostUpdated, onSheetChange }, ref) => {
    const { createPost, updatePost } = usePosts();
    const [visibility, setVisibility] = useState<PostVisibility>("public");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditMode = !!editPost;

    const {
      control,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(createPostSchema),
      defaultValues: { text: "" },
      mode: "onChange",
    });

    // Pre-populate form when editing
    useEffect(() => {
      if (editPost) {
        setValue("text", editPost.text);
        setVisibility(editPost.visibility);
      }
    }, [editPost, setValue]);

    const visibilityOptions: {
      value: PostVisibility;
      label: string;
      icon: any;
    }[] = [
      { value: "public", label: "Public", icon: Icons.globe },
      { value: "friends", label: "Friends", icon: Icons.unlocked },
    ];

    const onSubmit = async (data: { text: string }) => {
      setIsSubmitting(true);
      try {
        if (isEditMode && editPost) {
          await updatePost(editPost.id, { text: data.text, visibility });
          onPostUpdated?.();
        } else {
          await createPost({ text: data.text, visibility });
          onPostCreated?.();
        }
        reset();
        setVisibility("public");
        (ref as React.RefObject<BottomSheet>).current?.snapToIndex(-1);
        (ref as React.RefObject<BottomSheet>).current?.close();
      } catch (err) {
        console.error(
          `Error ${isEditMode ? "updating" : "creating"} post:`,
          err
        );
        Alert.alert(
          "Error",
          `Failed to ${isEditMode ? "update" : "create"} post`
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["60%"]}
        enablePanDownToClose
        onChange={onSheetChange}
        backgroundStyle={{
          backgroundColor: colors.hex.white,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.hex.placeholder,
          width: 40,
          height: 4,
        }}
      >
        <BottomSheetView className="flex-1 px-6 pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-6">
            {isEditMode ? "edit bloop" : "make a bloop"}
          </Text>

          <Controller
            control={control}
            name="text"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="What's on your mind?"
                multiline
                maxLength={1000}
                showCharacterCount
                error={errors.text?.message}
                className="min-h-[120px]"
                textAlignVertical="top"
              />
            )}
          />

          {/* Visibility selector */}
          <View className="mt-4 mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Who can see this?
            </Text>
            <View className="flex-row gap-2">
              {visibilityOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = visibility === option.value;
                return (
                  <Pressable
                    key={option.value}
                    className={`flex-1 py-3 rounded-xl border-2 flex-row justify-center items-center ${
                      isSelected
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-300 bg-white"
                    }`}
                    onPress={() => setVisibility(option.value)}
                  >
                    <Icon
                      size={16}
                      color={
                        isSelected ? colors.hex.purple600 : colors.hex.gray500
                      }
                    />
                    <Text
                      className={`ml-1 text-sm font-medium ${
                        isSelected ? "text-purple-600" : "text-gray-600"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Button
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || !!errors.text}
          >
            {isSubmitting
              ? isEditMode
                ? "Saving..."
                : "Posting..."
              : isEditMode
                ? "Save"
                : "Post"}
          </Button>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

CreatePostSheet.displayName = "CreatePostSheet";
