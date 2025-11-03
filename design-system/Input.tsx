import { TextInput, TextInputProps, View, Text } from "react-native";

interface InputProps extends TextInputProps {
  className?: string;
  label?: string;
  error?: string;
}

export function Input({ className = "", label, error, ...props }: InputProps) {
  const baseStyles =
    "py-5 px-4 rounded-xl border-2 border-gray-300 bg-white text-base text-gray-900 leading-5";
  const focusStyles = "focus:border-purple-600";
  const errorStyles = error ? "border-red-500" : "";
  const inputClass = `${baseStyles} ${focusStyles} ${errorStyles} ${className}`;

  return (
    <View className="w-full">
      {label && (
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          {label}
        </Text>
      )}
      <TextInput
        className={inputClass}
        placeholderTextColor="#9CA3AF"
        textAlignVertical="center"
        {...props}
      />
      {error && <Text className="text-sm text-red-500 mt-1">{error}</Text>}
    </View>
  );
}
