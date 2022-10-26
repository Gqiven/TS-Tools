import { ref } from "vue"

interface Actions<T> {
  setLeft: () => void,
  setRight: () => void,
  toggle: () => void,
  set: (v: T) => void
}

function useToggle<T>(defaultValue: T): [T, Actions<T>]
function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>]

function useToggle<D, R>(
  defaultValue: D = false as unknown as D,
  reverseValue?: R// 相对值
) {
  const state = ref<D | R>(defaultValue)

  const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

  const actions = {
    toggle: () => state.value = (state.value === defaultValue ? reverseValueOrigin : defaultValue) as any,
    set: (value: D | R) => state.value = value as any,
    setLeft: () => state.value = reverseValueOrigin as any,
    setRight: () => state.value = (state.value === defaultValue ? reverseValueOrigin : defaultValue) as any
  }

  return [state, actions]
}

export default useToggle
