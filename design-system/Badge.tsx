import { View, Text, ViewProps } from "react-native";

type BadgeVariant = "default" | "primary" | "secondary";

export interface BadgeProps extends ViewProps {
  variant?: BadgeVariant;
  className?: string;
  children: string;
}

const variantStyles = {
  default: "bg-gray-100",
  primary: "bg-purple-600",
  secondary: "bg-purple-100",
};

const textStyles = {
  default: "text-gray-500",
  primary: "text-white",
  secondary: "text-purple-600",
};

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "py-2 px-4 rounded-lg";
  const badgeClass = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <View className={badgeClass} {...props}>
      <Text className={`text-sm font-semibold ${textStyles[variant]}`}>
        {children}
      </Text>
    </View>
  );
}
