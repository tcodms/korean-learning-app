const INITIALS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';

/** First consonant (초성) of a Hangul syllable; other characters are returned as is. */
export function initialOf(char: string) {
  const code = char.charCodeAt(0) - 0xac00;
  return code >= 0 && code < 11172 ? INITIALS[Math.floor(code / 588)] : char;
}

/** Number of hint steps for a word: one per 초성, then one per full syllable. */
export const hintSteps = (word: string) => [...word].length * 2;

/**
 * Progressive 초성 hint. For 학교:
 * 1 → ㅎ, 2 → ㅎㄱ, 3 → 학ㄱ, 4 → 학교. Level 0 returns null (no hint yet).
 * Unrevealed syllables are omitted so the word length is not given away early.
 */
export function hangulHint(word: string, level: number) {
  if (level <= 0) return null;
  const chars = [...word], n = chars.length;
  return chars.map((char, i) => level > n ? (i < level - n ? char : initialOf(char)) : (i < level ? initialOf(char) : '')).join('');
}
