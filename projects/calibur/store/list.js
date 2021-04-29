import { ListStore } from '@flowlist/vue-listview'
import { flowApi as api } from '@calibur/api'

const list = ListStore({ api })

export const state = list.state

export const mutations = list.mutations

export const actions = list.actions

export const getters = list.getters
