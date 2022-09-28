export function camelKeys(...keys: string[]) {
  return keys.reduce<string>((result, key, index) => {
    if (index === 0) {
      result += key;
      return result;
    }
    const firstLetter = key.charAt(0);
    result += key.replace(firstLetter, firstLetter.toUpperCase());
    return result;
  }, '');
}