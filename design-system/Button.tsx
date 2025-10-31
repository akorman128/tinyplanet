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

const textStyles = {
  primary: "text-white",
  secondary: "text-purple-600",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "py-4 px-8 rounded-xl";
  const buttonClass = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <TouchableOpacity className={buttonClass} {...props}>
      <Text
        className={`text-center text-lg font-semibold ${textStyles[variant]}`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
