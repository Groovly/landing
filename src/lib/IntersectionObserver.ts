export function onElementVisible(
  element : HTMLElement,
  callback: () => any,
  threshold: number = 0.0
) {
  if (!element) {
    throw new Error('Element is invalid')
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      callback()
      observer.disconnect()
    }
  }, {
    root: null,
    threshold: threshold
  })

  observer.observe(element)
}
