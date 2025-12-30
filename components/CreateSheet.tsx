import React, { forwardRef, useState, useEffect } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Input,
  Button,
  Icons,
  TabBar,
  OptionSelector,
  colors,
} from "@/design-system";
import { usePosts } from "@/hooks/usePosts";
import { useTravelPlan } from "@/hooks/useTravelPlan";
import { PostVisibility } from "@/types/post";
import {
  LocationSearchInput,
  LocationSearchValue,
} from "./LocationSearchInput";

// Content type
type ContentType = "post" | "travel-plan";

// Post schema
const postSchema = z.object({
  text: z.string().min(1, "Post cannot be empty").max(500, "Post is too long"),
});

// Travel plan schema
const travelPlanSchema = z.object({
  destination: z
    .object({
      name: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    })
    .nullable()
    .refine((val) => val !== null, { message: "Destination is required" }),
  startDate: z.date().min(new Date(), "Start date must be in the future"),
  durationDays: z
    .number()
    .int()
    .min(1, "Minimum 1 day")
    .max(31, "Maximum 31 days"),
});

interface EditPost {
  id: string;
  text: string;
  visibility: PostVisibility;
}

interface EditTravelPlan {
  id: string;
  destination: { name: string; latitude: number; longitude: number };
  start_date: string;
  duration_days: number;
  visibility: PostVisibility;
}

interface CreateSheetProps {
  initialType?: ContentType;
  editPost?: EditPost;
  editTravelPlan?: EditTravelPlan | null;
  onPostCreated?: () => void;
  onPostUpdated?: () => void;
  onTravelPlanCreated?: () => void;
  onTravelPlanUpdated?: () => void;
  onSheetChange?: (index: number) => void;
}

export const CreateSheet = forwardRef<BottomSheet, CreateSheetProps>(
  (
    {
      initialType = "post",
      editPost,
      editTravelPlan,
      onPostCreated,
      onPostUpdated,
      onTravelPlanCreated,
      onTravelPlanUpdated,
      onSheetChange,
    },
    ref
  ) => {
    const { createPost, updatePost } = usePosts();
    const { createTravelPlan, updateTravelPlan } = useTravelPlan();
    const [contentType, setContentType] = useState<ContentType>(initialType);
    const [visibility, setVisibility] = useState<PostVisibility>("public");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Determine if in edit mode and which type
    const isEditMode = !!(editPost || editTravelPlan);
    const editModeType = editPost
      ? "post"
      : editTravelPlan
        ? "travel-plan"
        : null;

    // Lock content type to edit mode type
    useEffect(() => {
      if (editModeType) {
        setContentType(editModeType);
      }
    }, [editModeType]);

    // Post form
    const postForm = useForm({
      resolver: zodResolver(postSchema),
      defaultValues: { text: editPost?.text || "" },
      mode: "onChange",
    });

    // Travel plan form
    const travelPlanForm = useForm({
      resolver: zodResolver(travelPlanSchema),
      defaultValues: {
        destination: editTravelPlan
          ? {
              name: editTravelPlan.destination.name,
              latitude: editTravelPlan.destination.latitude,
              longitude: editTravelPlan.destination.longitude,
            }
          : null,
        startDate: editTravelPlan
          ? new Date(editTravelPlan.start_date)
          : new Date(),
        durationDays: editTravelPlan?.duration_days || 7,
      },
      mode: "all",
    });

    // Pre-populate visibility when editing
    useEffect(() => {
      if (editPost) {
        setVisibility(editPost.visibility);
      } else if (editTravelPlan) {
        setVisibility(editTravelPlan.visibility);
      }
    }, [editPost, editTravelPlan]);

    // Reset forms when switching tabs (only if not in edit mode)
    const handleTabChange = (newType: ContentType) => {
      if (!isEditMode) {
        setContentType(newType);
        // Reset forms
        postForm.reset();
        travelPlanForm.reset();
        // Reset visibility to default for the new type
        setVisibility(newType === "post" ? "public" : "friends");
      }
    };

    const visibilityOptions: {
      value: PostVisibility;
      label: string;
      icon?: any;
    }[] = [
      { value: "public", label: "Public", icon: Icons.globe },
      { value: "friends", label: "Friends", icon: Icons.unlocked },
    ];

    const onSubmit = async (data: any) => {
      setIsSubmitting(true);
      try {
        if (contentType === "post") {
          if (editPost) {
            await updatePost(editPost.id, { text: data.text, visibility });
            onPostUpdated?.();
          } else {
            await createPost({ text: data.text, visibility });
            onPostCreated?.();
          }
        } else {
          // Travel plan
          if (!data.destination) {
            Alert.alert("Error", "Please select a destination");
            setIsSubmitting(false);
            return;
          }

          const travelPlanInput = {
            destination: {
              name: data.destination.name,
              latitude: data.destination.latitude,
              longitude: data.destination.longitude,
            },
            start_date: data.startDate.toISOString().split("T")[0],
            duration_days: data.durationDays,
            post_visibility: visibility as PostVisibility,
          };

          if (editTravelPlan) {
            await updateTravelPlan({
              travel_plan_id: editTravelPlan.id,
              ...travelPlanInput,
            });
            Alert.alert("Success", "Travel plan updated! 🚀");
            onTravelPlanUpdated?.();
          } else {
            await createTravelPlan(travelPlanInput);
            Alert.alert("Success", "Travel plan created! 🚀");
            onTravelPlanCreated?.();
          }
        }

        // Reset and close
        postForm.reset();
        travelPlanForm.reset();
        setVisibility(contentType === "post" ? "public" : "friends");
        (ref as React.RefObject<BottomSheet>).current?.snapToIndex(-1);
        (ref as React.RefObject<BottomSheet>).current?.close();
      } catch (err) {
        console.error(
          `Error ${isEditMode ? "updating" : "creating"} ${contentType}:`,
          err
        );
        Alert.alert(
          "Error",
          `Failed to ${isEditMode ? "update" : "create"} ${
            contentType === "post" ? "post" : "travel plan"
          }`
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    const getButtonText = () => {
      if (isSubmitting) {
        return isEditMode
          ? "Saving..."
          : contentType === "post"
            ? "Posting..."
            : "Creating...";
      }
      return isEditMode
        ? "Save"
        : contentType === "post"
          ? "Post"
          : "Create Plan";
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["75%"]}
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
        <BottomSheetScrollView className="flex-1 px-6 pb-6">
          {!isEditMode && (
            <TabBar
              tabs={[
                { id: "post", label: "Post" },
                { id: "travel-plan", label: "Travel Plan" },
              ]}
              activeTab={contentType}
              onTabChange={(tabId) => handleTabChange(tabId as ContentType)}
              className="mb-4"
            />
          )}

          {/* Post Form */}
          {contentType === "post" && (
            <Controller
              control={postForm.control}
              name="text"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="What's on your mind?"
                  multiline
                  maxLength={1000}
                  showCharacterCount
                  error={postForm.formState.errors.text?.message}
                  className="min-h-[120px]"
                  textAlignVertical="top"
                />
              )}
            />
          )}

          {/* Travel Plan Form */}
          {contentType === "travel-plan" && (
            <>
              {/* Destination Search */}
              <Controller
                control={travelPlanForm.control}
                name="destination"
                render={({ field }) => (
                  <LocationSearchInput
                    value={field.value}
                    onChange={field.onChange}
                    error={travelPlanForm.formState.errors.destination?.message}
                    placeholder="e.g., Paris, France"
                  />
                )}
              />

              {/* Start Date Picker */}
              <Controller
                control={travelPlanForm.control}
                name="startDate"
                render={({ field }) => (
                  <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </Text>
                    <Pressable
                      className="bg-white border border-gray-300 rounded-lg px-4 py-3"
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Text className="text-base text-gray-900">
                        {field.value.toLocaleDateString()}
                      </Text>
                    </Pressable>
                    {showDatePicker && (
                      <DateTimePicker
                        value={field.value}
                        mode="date"
                        minimumDate={new Date()}
                        onChange={(event, date) => {
                          setShowDatePicker(false);
                          if (date) field.onChange(date);
                        }}
                      />
                    )}
                    {travelPlanForm.formState.errors.startDate && (
                      <Text className="text-red-500 text-sm mt-1">
                        {travelPlanForm.formState.errors.startDate.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Duration */}
              <Controller
                control={travelPlanForm.control}
                name="durationDays"
                render={({ field }) => (
                  <View className="mb-4">
                    <Input
                      label="Duration (days)"
                      placeholder="e.g., 7"
                      keyboardType="number-pad"
                      value={field.value?.toString() || ""}
                      onChangeText={(text) =>
                        field.onChange(parseInt(text) || 1)
                      }
                      error={
                        travelPlanForm.formState.errors.durationDays?.message
                      }
                    />
                    {!travelPlanForm.formState.errors.durationDays && (
                      <Text className="text-xs text-gray-500 mt-1">
                        Maximum 31 days
                      </Text>
                    )}
                  </View>
                )}
              />
            </>
          )}

          {/* Visibility selector */}
          <OptionSelector
            label="Who can see this?"
            options={visibilityOptions}
            value={visibility}
            onChange={setVisibility}
            className=" mb-6"
          />

          <Button
            variant="primary"
            onPress={
              contentType === "post"
                ? postForm.handleSubmit(onSubmit)
                : travelPlanForm.handleSubmit(onSubmit)
            }
            disabled={
              isSubmitting ||
              (contentType === "post"
                ? !!postForm.formState.errors.text
                : false)
            }
          >
            {getButtonText()}
          </Button>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

CreateSheet.displayName = "CreateSheet";
