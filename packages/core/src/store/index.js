import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    user: {},
    haveAuthToken: false,
    roles: null,
    isAuth: false,
    isLogout: false,
    logging: false
  }),
  mutations: {
    SET_USER_INFO(state, user) {
      const signed = !!(user && user.slug)
      state.user = user
      state.haveAuthToken = signed
      state.isAuth = signed
      state.logging = false
    },
    SET_USER_TOKEN(state, token) {
      if (state.isLogout) {
        return
      }
      state.haveAuthToken = !!token
    },
    SET_LOGGING(state) {
      state.logging = true
    },
    USER_LOGOUT(state) {
      state.haveAuthToken = false
      state.isAuth = false
      state.logging = false
      state.isLogout = true
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
    async initAuth({ state, commit }) {
      if (!state.haveAuthToken || state.logging) {
        return null
      }
      if (state.user.slug) {
        return state.user
      }
      try {
        commit('SET_LOGGING')
        const user = await $api('sign.current')
        commit('SET_USER_INFO', user)
        return user
      } catch (e) {
        commit('SET_USER_INFO', {})
        return null
      }
    },
    getUserRoles({ state, commit }) {
      if (state.roles || !state.user || !state.user.title.length) {
        return
      }

      $api('user.roles').then((data) => {
        commit('SET_USER_ROLE', data)
      })
    }
  },
  getters: {
    isMine: (state) => (slug) => (state.isAuth ? state.user.slug === slug : false),
    isAdmin: (state) => (state.isAuth ? state.user.is_admin : false),
    hasRole: (state) => (role) => (state.user.is_admin ? true : state.roles ? ~state.roles.indexOf(role) : false)
  },
  modules: {}
})
