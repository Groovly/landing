export function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

export function pickRandomElement(array) {
  if (!Array.isArray(array)) {
    return null;
  }
  return array[Math.trunc(Math.random() * array.length)];
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function getCssVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

export function setCssVariable(name, value) {
  document.documentElement.style.setProperty(name, value);
}

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function isProd() {
  return process.env.NODE_ENV === 'production';
}
