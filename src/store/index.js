import Vue from 'vue'
import Vuex from 'vuex'
import {vuexLocal} from "../plugins/vuex_persistance"

import AuthStore from './auth'
import SearchStore from './search'
import PharmaStore from './pharma'

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [vuexLocal.plugin],
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
