import createUseStorageState from '../createUseStorageState';
import { isBrowser } from '../utils';

const useSessionStorageState = createUseStorageState(() =>
  isBrowser ? sessionStorage : undefined,
);

export default useSessionStorageState;
