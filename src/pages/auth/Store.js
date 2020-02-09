export default {
  namespaced: true,
  state: {
    user: 'user'
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser: (state, val) => { state.user = val }
  },
  actions: {

  }
}
