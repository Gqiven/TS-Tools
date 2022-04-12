import { stateTypes } from "./modules/types"

export interface RootStateTypes {
  name: string
}

export interface AllStateTypes extends RootStateTypes {
  testModule: stateTypes
}