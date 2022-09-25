export function useId() {
  const nowTime = new Date().getTime();
  return `${getRandomChars()}${nowTime}`;
}

const chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

export function getRandomChars(length: number = 5) {
  let index = 0;
  let result = "";
  for (let i = 0; i < length; i++) {
    index = Math.floor(Math.random() * 26);
    result += chars[index];
  }

  return result;
}
