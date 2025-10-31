import { Text, TextProps } from "react-native";

interface TypographyProps extends TextProps {
  className?: string;
}

export function Heading({ className = "", ...props }: TypographyProps) {
  return (
    <Text
      className={`text-5xl font-bold text-purple-600 ${className}`}
      {...props}
    />
  );
}

export function Subheading({ className = "", ...props }: TypographyProps) {
  return <Text className={`text-xl text-gray-600 ${className}`} {...props} />;
}

export function Body({ className = "", ...props }: TypographyProps) {
  return <Text className={`text-base text-gray-900 ${className}`} {...props} />;
}

export function Caption({ className = "", ...props }: TypographyProps) {
  return <Text className={`text-sm text-gray-500 ${className}`} {...props} />;
}
