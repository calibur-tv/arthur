export const routes = [
  { path: '/', component: () => import('../pages') },
  { path: '/about', component: () => import('../pages/about.vue') }
]
