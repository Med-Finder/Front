import Vue from 'vue'
import Vuex from 'vuex'

import AuthStore from './auth'
import SearchStore from './search'
import PharmaStore from './pharma'

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
    auth: AuthStore,
    search: SearchStore,
    pharma: PharmaStore,
  }
})
