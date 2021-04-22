import { createStore } from 'vuex'
import { ListStore } from '@flowlist/vue-listview'
import { flowApi } from '@calibur/api'
import desk from './desk'

export default createStore({
  state: () => ({
    user: {},
    roles: null,
    isAuth: false,
    isGuest: false
  }),
  mutations: {
    SET_USER_INFO(state, user) {
      const signed = !!(user && user.slug)
      state.user = user || {}
      state.isAuth = signed
      state.isGuest = !signed
    },
    USER_LOGOUT(state) {
      state.isAuth = false
      state.isGuest = true
      state.user = {}
    },
    UPDATE_USER_INFO(state, { key, value }) {
      state.user[key] = value
    },
    SET_USER_ROLE(state, data) {
      state.roles = data
    }
  },
  actions: {
    getUserRoles() {}
    // getUserRoles({ state, commit }) {
    // if (state.roles || !state.user || !state.user.title.length) {
    //   return
    // }
    //
    // $api.user.roles().then((data) => {
    //   commit('SET_USER_ROLE', data)
    // })
    // }
  },
  getters: {
    isMine: (state) => (slug) => (state.isAuth ? state.user.slug === slug : false),
    isAdmin: (state) => (state.isAuth ? state.user.is_admin : false),
    hasRole: (state) => (role) => (state.user.is_admin ? true : state.roles ? ~state.roles.indexOf(role) : false)
  },
  modules: {
    desk,
    list: ListStore({ api: flowApi })
  }
})
