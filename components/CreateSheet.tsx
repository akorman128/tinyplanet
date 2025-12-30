import React, { forwardRef, useState, useEffect } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Icons, TabBar, OptionSelector, colors } from "@/design-system";
import { usePosts } from "@/hooks/usePosts";
import { useTravelPlan } from "@/hooks/useTravelPlan";
import { PostVisibility } from "@/types/post";
import { TravelPlan } from "@/types/travelPlan";
import { PostForm, postSchema, PostFormData } from "./PostForm";
import {
  TravelPlanForm,
  travelPlanSchema,
  TravelPlanFormData,
} from "./TravelPlanForm";

// Content type
type ContentType = "post" | "travel-plan";

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
    const {
      createTravelPlan,
      updateTravelPlan,
      getActiveTravelPlan,
      cancelTravelPlan,
    } = useTravelPlan();
    const [contentType, setContentType] = useState<ContentType>(initialType);
    const [visibility, setVisibility] = useState<PostVisibility>("public");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTravelPlan, setActiveTravelPlan] = useState<TravelPlan | null>(
      null
    );
    const [isEditingActivePlan, setIsEditingActivePlan] = useState(false);

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
    const postForm = useForm<PostFormData>({
      resolver: zodResolver(postSchema),
      defaultValues: { text: editPost?.text || "" },
      mode: "onChange",
    });

    // Travel plan form
    const travelPlanForm = useForm<TravelPlanFormData>({
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

    // Fetch active travel plan when sheet opens on travel-plan tab
    useEffect(() => {
      const fetchActivePlan = async () => {
        if (contentType === "travel-plan" && !editPost && !editTravelPlan) {
          try {
            const { data } = await getActiveTravelPlan();
            setActiveTravelPlan(data);
          } catch (error) {
            console.error("Error fetching active travel plan:", error);
          }
        }
      };

      fetchActivePlan();
    }, [contentType, editPost, editTravelPlan, getActiveTravelPlan]);

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

    // Handle editing the active travel plan
    const handleEditActivePlan = () => {
      if (!activeTravelPlan) return;

      // Parse PostGIS POINT format: "POINT(lng lat)"
      const coordMatch = activeTravelPlan.destination_location.match(
        /POINT\(([^ ]+) ([^ ]+)\)/
      );
      const longitude = parseFloat(coordMatch?.[1] || "0");
      const latitude = parseFloat(coordMatch?.[2] || "0");

      setIsEditingActivePlan(true);
      travelPlanForm.reset({
        destination: {
          name: activeTravelPlan.destination_name,
          latitude,
          longitude,
        },
        startDate: new Date(activeTravelPlan.start_date),
        durationDays: activeTravelPlan.duration_days,
      });
      // Keep current visibility or default to friends
      setVisibility("friends");
    };

    // Handle deleting the active travel plan
    const handleDeleteActivePlan = () => {
      if (!activeTravelPlan) return;

      Alert.alert(
        "Cancel Travel Plan",
        "Are you sure you want to cancel this travel plan? This will also delete the associated post.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await cancelTravelPlan(activeTravelPlan.id);
                Alert.alert("Success", "Travel plan cancelled");
                setActiveTravelPlan(null);
                setIsEditingActivePlan(false);
                onTravelPlanUpdated?.();
                (ref as React.RefObject<BottomSheet>).current?.close();
              } catch (error) {
                console.error("Error cancelling travel plan:", error);
                Alert.alert("Error", "Failed to cancel travel plan");
              }
            },
          },
        ]
      );
    };

    // Handle canceling edit mode
    const handleCancelEdit = () => {
      setIsEditingActivePlan(false);
      travelPlanForm.reset({
        destination: null,
        startDate: new Date(),
        durationDays: 7,
      });
      setVisibility("friends");
    };

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
          } else if (isEditingActivePlan && activeTravelPlan) {
            await updateTravelPlan({
              travel_plan_id: activeTravelPlan.id,
              ...travelPlanInput,
            });
            Alert.alert("Success", "Travel plan updated! 🚀");
            setActiveTravelPlan(null);
            setIsEditingActivePlan(false);
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
        return isEditMode || isEditingActivePlan
          ? "Saving..."
          : contentType === "post"
            ? "Posting..."
            : "Creating...";
      }
      return isEditMode || isEditingActivePlan
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
            <PostForm
              control={postForm.control}
              errors={postForm.formState.errors}
            />
          )}

          {/* Travel Plan Form */}
          {contentType === "travel-plan" && (
            <TravelPlanForm
              control={travelPlanForm.control}
              errors={travelPlanForm.formState.errors}
              activeTravelPlan={activeTravelPlan}
              isEditingActivePlan={isEditingActivePlan}
              onEditActivePlan={handleEditActivePlan}
              onDeleteActivePlan={handleDeleteActivePlan}
              onCancelEdit={handleCancelEdit}
            />
          )}

          {/* Only show visibility and submit button when creating/editing */}
          {(contentType === "post" ||
            isEditingActivePlan ||
            !activeTravelPlan) && (
            <>
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
            </>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

CreateSheet.displayName = "CreateSheet";
