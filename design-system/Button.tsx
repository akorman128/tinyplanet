import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  className?: string;
  children: string;
}

const variantStyles = {
  primary: "bg-purple-600 active:bg-purple-700",
  secondary: "bg-white border-2 border-purple-600 active:bg-gray-50",
};

const disabledVariantStyles = {
  primary: "bg-gray-300",
  secondary: "bg-gray-100 border-2 border-gray-300",
};

const textStyles = {
  primary: "text-white",
  secondary: "text-purple-600",
};

const disabledTextStyles = {
  primary: "text-gray-500",
  secondary: "text-gray-400",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = "py-4 px-8 rounded-xl";
  const buttonVariantStyle = disabled
    ? disabledVariantStyles[variant]
    : variantStyles[variant];
  const buttonClass = `${baseStyles} ${buttonVariantStyle} ${className}`;
  const textVariantStyle = disabled
    ? disabledTextStyles[variant]
    : textStyles[variant];

  return (
    <TouchableOpacity className={buttonClass} disabled={disabled} {...props}>
      <Text className={`text-center text-lg font-semibold ${textVariantStyle}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
