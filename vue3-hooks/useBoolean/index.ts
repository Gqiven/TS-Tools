import useToggle from "../useToggle"

interface Actions<T> {
  toggle: () => void,
  set: (v: T) => void,
  setTrue: () => void,
  setFalse: () => void
}

const useBoolean = (initialState = false): [boolean, Actions<boolean>] => {
  const [toggleState, { toggle, set, setLeft, setRight }] = useToggle(initialState, !initialState)

  const actions = {
    toggle,
    set: (v: boolean) => set(!!v),
    setTrue: setLeft,
    setFalse: setRight
  }

  return [toggleState, actions]
}

export default useBoolean