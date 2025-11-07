import { TextInput, TextInputProps, View, Text } from "react-native";
import { useState } from "react";

interface InputProps extends TextInputProps {
  className?: string;
  label?: string;
  error?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
}

export function Input({ className = "", label, error, maxLength, showCharacterCount = false, ...props }: InputProps) {
  const [currentLength, setCurrentLength] = useState(
    props.value?.toString().length || props.defaultValue?.toString().length || 0
  );
  const baseStyles =
    "py-5 px-4 rounded-xl border-2 border-gray-300 bg-white text-base text-gray-900 leading-5";
  const focusStyles = "focus:border-purple-600";
  const errorStyles = error ? "border-red-500" : "";
  const inputClass = `${baseStyles} ${focusStyles} ${errorStyles} ${className}`;

  const handleChangeText = (text: string) => {
    setCurrentLength(text.length);
    props.onChangeText?.(text);
  };

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
      <TextInput
        className={inputClass}
        placeholderTextColor="#9CA3AF"
        textAlignVertical="center"
        autoComplete="off"
        maxLength={maxLength}
        {...props}
        onChangeText={handleChangeText}
      />
      {error && <Text className="text-sm text-red-500 mt-1">{error}</Text>}
      {!label && showCharacterCount && maxLength && (
        <Text className="text-xs text-gray-500 mt-1 text-right">
          {currentLength}/{maxLength}
        </Text>
      )}
    </View>
  );
}
