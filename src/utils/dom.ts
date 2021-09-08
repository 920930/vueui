export const on = (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture: boolean = false
): void => {
  if(element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

export const off = (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture: boolean = false
): void => {
  if(element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}