export function isValidEmojiString(text: string, count: number = 3): boolean {
  if (!text) return false;

  // Remove all whitespace to get pure emoji content
  const trimmed = text.trim().replace(/\s/g, '');

  // Match emoji using a comprehensive regex pattern
  // This pattern matches most emojis including:
  // - Basic emojis
  // - Emojis with skin tone modifiers
  // - Complex emojis (flags, families, etc.)
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;

  const matches = trimmed.match(emojiRegex);

  if (!matches) return false;

  // Check if we have exactly the required count
  if (matches.length !== count) return false;

  // Verify the string only contains emojis (no other characters)
  const joinedEmojis = matches.join('');
  return trimmed === joinedEmojis;
}

export function extractEmojis(text: string): string[] {
  if (!text) return [];

  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
  const matches = text.match(emojiRegex);

  return matches || [];
}

export function isValidVibe(emojis: string): boolean {
  return isValidEmojiString(emojis, 3);
}
