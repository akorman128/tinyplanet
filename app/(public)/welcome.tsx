import { View, Text } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Heading, Subheading, Caption } from "../../design-system";

export default function Page() {
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-purple-50">
      <View className="flex-1 items-center justify-center px-6">
        <View className="items-center mb-12">
          <Heading className="mb-2">Welcome</Heading>
          <Subheading className="text-center">
            Your planet is waiting for you
          </Subheading>
        </View>

        <View className="w-32 h-32 bg-purple-200 rounded-full items-center justify-center mb-16">
          <Text className="text-6xl">🌍</Text>
        </View>

        <View className="w-full gap-4">
          <Button
            variant="primary"
            className="shadow-lg"
            onPress={() => router.push("/sign-up")}
          >
            Join
          </Button>

          <Button variant="secondary" onPress={() => router.push("/sign-in")}>
            Sign In
          </Button>
        </View>

        <View className="mt-8">
          <Caption className="text-center">Made with ❤️ for friends</Caption>
        </View>
      </View>
    </SafeAreaView>
  );
}
