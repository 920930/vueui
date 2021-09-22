export const isValidComponentSize = (val: string) => {
  return ['', 'large', 'medium', 'small', 'mini'].includes(val)
}

export const getStyle = (el: HTMLElement, opt: string) => {
  return parseInt(window.getComputedStyle(el)[opt])
}