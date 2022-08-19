import { debounce } from 'lodash';
import { computed, ComputedRef, ref, Ref, watch } from 'vue';

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

declare type ComputedGetter<T> = (ctx?: any) => T;

function useDebounce<T>(
  value: Ref<T> | ComputedGetter<T>,
  options?: DebounceOptions,
) {
  // targetValue是防抖处理的目标数据值
  let targetValue: Ref<T> | ComputedRef<T>;
  // 判断传入的数据是否是函数
  if (typeof value === 'function') {
    targetValue = computed(value);
  } else {
    targetValue = value;
  }

  const debouncedValue = ref<T>(targetValue.value);

  const setValue = debounce(
    () => {
      debouncedValue.value = targetValue.value as any;
    },
    options?.wait ?? 1000,
    options,
  );

  watch(targetValue, setValue);

  return debouncedValue;
}

export default useDebounce