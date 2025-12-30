import React from "react";
import { View, Text, Pressable } from "react-native";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { z } from "zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input, Button } from "@/design-system";
import { TravelPlan } from "@/types/travelPlan";
import { LocationSearchInput } from "./LocationSearchInput";

// Travel plan schema
export const travelPlanSchema = z.object({
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

export type TravelPlanFormData = z.infer<typeof travelPlanSchema>;

interface TravelPlanFormProps {
  control: Control<TravelPlanFormData>;
  errors: FieldErrors<TravelPlanFormData>;
  activeTravelPlan: TravelPlan | null;
  isEditingActivePlan: boolean;
  onEditActivePlan: () => void;
  onDeleteActivePlan: () => void;
  onCancelEdit: () => void;
}

export function TravelPlanForm({
  control,
  errors,
  activeTravelPlan,
  isEditingActivePlan,
  onEditActivePlan,
  onDeleteActivePlan,
  onCancelEdit,
}: TravelPlanFormProps) {
  return (
    <>
      {/* Active Travel Plan Banner */}
      {activeTravelPlan && !isEditingActivePlan && (
        <View className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-semibold text-purple-900">
              Active Travel Plan
            </Text>
            <Text className="text-xs text-purple-700">
              {new Date(activeTravelPlan.start_date).toLocaleDateString()} -{" "}
              {new Date(activeTravelPlan.end_date).toLocaleDateString()}
            </Text>
          </View>

          <Text className="text-lg font-medium text-gray-900 mb-1">
            {activeTravelPlan.destination_name}
          </Text>
          <Text className="text-sm text-gray-600 mb-4">
            {activeTravelPlan.duration_days} days
          </Text>

          <View className="flex-row gap-2">
            <Button
              variant="secondary"
              onPress={onEditActivePlan}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              onPress={onDeleteActivePlan}
              className="flex-1"
            >
              Delete
            </Button>
          </View>
        </View>
      )}

      {/* Show form only when creating new plan or editing active plan */}
      {(isEditingActivePlan || !activeTravelPlan) && (
        <>
          {isEditingActivePlan && (
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-base font-semibold text-gray-900">
                Editing Travel Plan
              </Text>
              <Pressable onPress={onCancelEdit}>
                <Text className="text-purple-600 font-medium">Cancel</Text>
              </Pressable>
            </View>
          )}

          <Controller
            control={control}
            name="destination"
            render={({ field }) => (
              <LocationSearchInput
                value={field.value}
                onChange={field.onChange}
                label="📍 Destination"
                error={errors.destination?.message}
                placeholder="e.g., Paris, France"
              />
            )}
          />

          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </Text>
                <DateTimePicker
                  value={field.value}
                  mode="date"
                  minimumDate={new Date()}
                  onChange={(event, date) => {
                    if (date) field.onChange(date);
                  }}
                />

                {errors.startDate && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.startDate.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Duration */}
          <Controller
            control={control}
            name="durationDays"
            render={({ field }) => (
              <View className="mb-4">
                <Input
                  label="Duration (days)"
                  placeholder="e.g., 7"
                  keyboardType="number-pad"
                  value={field.value?.toString() || ""}
                  onChangeText={(text) => field.onChange(parseInt(text) || 1)}
                  error={errors.durationDays?.message}
                />
                {!errors.durationDays && (
                  <Text className="text-xs text-gray-500 mt-1">
                    Maximum 31 days
                  </Text>
                )}
              </View>
            )}
          />
        </>
      )}
    </>
  );
}
