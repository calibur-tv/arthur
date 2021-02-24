import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './route'

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  {
    routes
  }
)
