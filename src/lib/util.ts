export function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

export function pickRandomElement(array: []) {
  if (!Array.isArray(array)) {
    return null;
  }
  return array[Math.trunc(Math.random() * array.length)];
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getCssVariable(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

export function setCssVariable(name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}
