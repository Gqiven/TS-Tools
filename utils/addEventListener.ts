/*
  example: ../examples/utils/addEventListener/index.vue
*/
export const addEventListenerWrap = (
  target: HTMLElement | Window | null,
  eventType: string,
  cb: () => void,
  option?: object
) => {
  const callback = cb
  if(target?.addEventListener) {
    target.addEventListener(eventType, callback, option)
  }
  return {
    remove: () => {
      if(target?.removeEventListener) {
        target.removeEventListener(eventType, callback, option)
      }
    }
  }
}