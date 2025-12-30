import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/design-system";

// Post schema
export const postSchema = z.object({
  text: z.string().min(1, "Post cannot be empty").max(500, "Post is too long"),
});

export type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  control: Control<PostFormData>;
  errors: FieldErrors<PostFormData>;
}

export function PostForm({ control, errors }: PostFormProps) {
  return (
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
  );
}
