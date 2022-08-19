import { throttle } from "lodash";
import { computed, ComputedRef, ref, Ref, watch } from "vue";
import { isFunction } from "../utils";

type ComputedGetter<T> = (ctx?: any) => T;

interface ThrottleOptions {
  wait?: number,
  leading?: boolean;
  trailing?: boolean;
}

function useThrottle<T>(
  value: Ref<T> | ComputedGetter<T>,
  options?: ThrottleOptions
) {
  let targetValue: Ref<T> | ComputedRef<T>
  if(isFunction(value)) {
    targetValue = computed(value)
  }else {
    targetValue = value
  }

  const throttleValue = ref<T>(targetValue.value)
  
  const setValue = throttle(
    () => {
      throttleValue.value = targetValue.value as any
    },
    options?.wait ?? 1000,
    options
  )

  watch(targetValue, setValue)

  return throttleValue
  
}

export default useThrottle