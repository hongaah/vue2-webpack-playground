import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: ''
    }
  },
  mutations: {
    setUser (state, val) {
      state.user = val
    },
    removeUser (state) {
      state.user = {}
    }
  },
  actions: {
    setUser (context) {
      context.commit('setUser')
    },
    removeUser (context) {
      context.commit('removeUser')
    }
  },
  modules: {
  }
})
