import { isFunction, isUndefined } from '../utils'
import Cookies from 'js-cookie'
import { Ref, ref } from 'vue'

type State = string | undefined

interface Options extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State)
}

function useCookieState (key: string, options: Options = {}) {
  // 假如有值，则直接返回
  const cookieValue = Cookies.get(key);
  const state: Ref = ref(cookieValue || '')
  const updateState = (
    newValue: State,
    newOptions: Cookies.CookieAttributes = {}
  ) => {
    let { defaultValue, ...resetOptions } = { ...options, ...newOptions }
    let _newValue
    if(isFunction(newValue)) {
      _newValue = newValue()
    }else {
      _newValue = newValue
    }
    state.value = _newValue
    if(isUndefined(_newValue)) {
      Cookies.remove(key)
    }else {
      Cookies.set(key, _newValue, resetOptions)
    }
  }

  return [
    state,
    updateState
  ]
}

export default useCookieState