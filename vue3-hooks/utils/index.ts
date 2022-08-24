export const isFunction = (value: unknown): value is Function => typeof value === 'function';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';


export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
