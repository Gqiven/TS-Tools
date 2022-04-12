import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import testModule from './modules/testModule'
import { RootStateTypes, AllStateTypes } from './types'

export const store = createStore<RootStateTypes>({
  state: {
    text: 'test text'
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    testModule
  }
})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key)
}
