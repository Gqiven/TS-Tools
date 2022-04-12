import { stateTypes } from "./types"

const testModule = {
  namespace: true,
  state: {
    name: 'test name'
  },
  mutations: {
    CHANGE_NAME(state: stateTypes, data: string) {
      state.name = data
    }
  },
  actions: {}
}

export default testModule