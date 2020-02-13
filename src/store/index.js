import Vue from 'vue'
import Vuex from 'vuex'

import SearchStore from './search'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    search: SearchStore
  }
})
