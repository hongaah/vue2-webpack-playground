import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: '',
      username: ''
    },
    auth: false
  },
  mutations: {
    setUser (state, val) {
      state.user = val
    },
    removeUser (state) {
      state.user = {}
    },
    setAuth (state, val) {
      state.auth = val
    }
  },
  actions: {
    setUser (context) {
      context.commit('setUser')
    },
    removeUser (context) {
      context.commit('removeUser')
    },
    setAuth (context) {
      context.commit('setAuth')
    }
  },
  modules: {
  }
})
