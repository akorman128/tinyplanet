# Conventions & Guidelines

## UI Components

### Never Use SafeAreaView

**DO NOT use `SafeAreaView` from `react-native`.**

- It has inconsistent behavior across iOS and Android
- Does not work properly with Expo Router's navigation
- Can cause layout issues with headers and tab bars

**Instead, use:**
- Plain `View` components with appropriate padding/margins
- Expo Router's built-in screen options for proper safe area handling
- `react-native-safe-area-context` if explicit safe area handling is needed
