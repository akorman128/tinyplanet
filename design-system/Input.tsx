import { TextInput, TextInputProps, View, Text, Pressable } from "react-native";
import { useState } from "react";
import { Icons } from "./Icons";
import { colors } from "./colors";

interface InputProps extends Omit<TextInputProps, 'onChange'> {
  className?: string;
  label?: string;
  error?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  onChange?: (value: string) => void; // Support React Hook Form
}

export function Input({ className = "", label, error, maxLength, showCharacterCount = false, clearable = false, onClear, onChange, ...props }: InputProps) {
  const [currentLength, setCurrentLength] = useState(
    props.value?.toString().length || props.defaultValue?.toString().length || 0
  );
  const baseStyles =
    "py-5 px-4 rounded-xl border-2 border-gray-300 bg-white text-base text-gray-900 leading-5";
  const focusStyles = "focus:border-purple-600";
  const errorStyles = error ? "border-red-500" : "";
  const clearPadding = clearable ? "pr-12" : "";
  const inputClass = `${baseStyles} ${focusStyles} ${errorStyles} ${clearPadding} ${className}`;

  const handleChangeText = (text: string) => {
    setCurrentLength(text.length);
    props.onChangeText?.(text);
    onChange?.(text); // Support React Hook Form
  };

  const showClearIcon = clearable && props.value && props.value.toString().length > 0;

  return (
    <View className="w-full">
      {label && (
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm font-semibold text-gray-700">
            {label}
          </Text>
          {showCharacterCount && maxLength && (
            <Text className="text-xs text-gray-500">
              {currentLength}/{maxLength}
            </Text>
          )}
        </View>
      )}
      <View className="relative">
        <TextInput
          className={inputClass}
          placeholderTextColor="#9CA3AF"
          textAlignVertical="center"
          autoComplete="off"
          maxLength={maxLength}
          {...props}
          onChangeText={handleChangeText}
        />
        {showClearIcon && (
          <Pressable
            onPress={onClear}
            className="absolute right-4 top-0 bottom-0 justify-center"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icons.close size={18} color={colors.hex.placeholder} />
          </Pressable>
        )}
      </View>
      {error && <Text className="text-sm text-red-500 mt-1">{error}</Text>}
      {!label && showCharacterCount && maxLength && (
        <Text className="text-xs text-gray-500 mt-1 text-right">
          {currentLength}/{maxLength}
        </Text>
      )}
    </View>
  );
}
