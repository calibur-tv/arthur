export default {
  namespaced: true,
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
  getters: {}
}
