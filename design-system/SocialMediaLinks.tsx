import React from "react";
import { View, Pressable, Linking } from "react-native";
import { Icons } from "./Icons";
import { colors } from "./colors";

export interface SocialMediaLinksProps {
  website?: string | null;
  instagram?: string | null;
  x?: string | null;
  letterboxd?: string | null;
  beli?: string | null;
}

type SocialMediaPlatform = {
  value: string | null | undefined;
  icon: keyof typeof Icons;
  getUrl: (input: string) => string;
  appScheme?: { url: (username: string) => string };
};

export const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
  website,
  instagram,
  x,
  letterboxd,
  beli,
}) => {
  const openWithAppFallback = (appUrl: string, webUrl: string) => {
    Linking.canOpenURL(appUrl)
      .then((supported) => {
        return Linking.openURL(supported ? appUrl : webUrl);
      })
      .catch(() => Linking.openURL(webUrl));
  };

  const platforms: SocialMediaPlatform[] = [
    {
      value: website,
      icon: "globe",
      getUrl: (input) => input,
    },
    {
      value: instagram,
      icon: "instagram",
      getUrl: (input) => `https://instagram.com/${input}`,
      appScheme: {
        url: (username) => `instagram://user?username=${username}`,
      },
    },
    {
      value: x,
      icon: "twitter",
      getUrl: (input) => `https://x.com/${input}`,
      appScheme: {
        url: (username) => `twitter://user?screen_name=${username}`,
      },
    },
    {
      value: letterboxd,
      icon: "letterboxd",
      getUrl: (input) => `https://letterboxd.com/${input}`,
      appScheme: {
        url: (username) => `letterboxd://user?username=${username}`,
      },
    },
    {
      value: beli,
      icon: "beli",
      getUrl: (input) => `https://beli.app/${input}`,
      appScheme: {
        url: (username) => `beli://user?username=${username}`,
      },
    },
  ];

  const activePlatforms = platforms.filter((p) => p.value);

  if (activePlatforms.length === 0) {
    return null;
  }

  const handlePress = (platform: SocialMediaPlatform) => {
    const input = platform.value!;
    const webUrl = platform.getUrl(input);

    if (platform.appScheme) {
      const username = input;
      const appUrl = platform.appScheme.url(username);
      openWithAppFallback(appUrl, webUrl);
    } else {
      Linking.openURL(webUrl);
    }
  };

  return (
    <View className="flex-row items-center gap-4 py-2">
      {activePlatforms.map((platform, index) => {
        const Icon = Icons[platform.icon];
        return (
          <Pressable key={index} onPress={() => handlePress(platform)}>
            <Icon size={24} color={colors.hex.gray600} />
          </Pressable>
        );
      })}
    </View>
  );
};
