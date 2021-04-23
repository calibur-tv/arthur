import { createStore } from 'vuex'
import { ListStore } from '@flowlist/vue-listview'
import { flowApi } from '@calibur/api'

export default createStore({
  state: () => ({
    folderId: -1,
    folders: [],
    files: []
  }),
  mutations: {
    UPDATE_FOLDER_ID(state, id) {
      state.folderId = id
    }
  },
  actions: {},
  getters: {},
  modules: {
    list: ListStore({ api: flowApi })
  }
})
