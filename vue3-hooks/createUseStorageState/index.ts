import { ref } from "vue"
import { isUndefined, isFunction } from "../utils"

interface IsFunctionUpdater<T> {
  (previousState?: T): T;
}

interface Options<T> {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
  defaultValue?: T | IsFunctionUpdater<T>
}

function createUseStorageState(getStorage: () => Storage | undefined) {
  function useStorageState<T>(key: string, options?: Options<T>) {
    let storage: Storage | undefined

    // 可能会有一些权限的问题 导致无法访问localstorage
    try {
      storage = getStorage()
    } catch (error) {
      console.log(error)
    }

    // 序列化数据
    const serializer = (value: T) => {
      if (options?.serializer) {
        return options?.serializer(value);
      }
      return JSON.stringify(value);
    }

    // 反序列化数据
    const deserializer = (value: string) => {
      if(options?.deserializer) {
        return options?.deserializer(value)
      }
      return JSON.parse(value)
    }

    // 获取已有数据
    function getStoredValue() {
      try {
        const raw = storage?.getItem(key);
        if (raw) {
          return deserializer(raw);
        }
      } catch (error) {
        console.log(error)
      }
    }

    const state = ref(getStoredValue())

    const updateState = (value: string) => {
      const newState = isFunction(value) ? value() : value
      state.value = newState
      
      // 非有效数据 则移除
      if(isUndefined(newState)) {
        storage?.removeItem(key)
      }else {
        try {
          storage?.setItem(key, serializer(newState));
        } catch (error) {
          console.log(error)
        }
      }
    }

    return [state, updateState]
  }

  return useStorageState
}

export default createUseStorageState