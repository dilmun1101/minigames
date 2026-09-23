const INITIALS_COUNT = 2;
const UPPERCASE_LETTERS = /[^A-Z]/g;

export function getAvatarLetters(name: string): string {
  return name.replace(UPPERCASE_LETTERS, '').slice(0, INITIALS_COUNT);
}
