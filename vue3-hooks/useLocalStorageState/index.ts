import createUseStorageState from '../createUseStorageState'
import { isBrowser } from '../utils'

const useLocalStorageState  = createUseStorageState(() => isBrowser ? localStorage : undefined)

export default useLocalStorageState