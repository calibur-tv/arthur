export const routes = [
  { path: '/', component: () => import('../pages/index.vue') },
  { path: '/search', component: () => import('../pages/search.vue') },
  { path: '/desk', component: () => import('../pages/desk.vue') },
  { path: '/about', component: () => import('../pages/about.vue') }
]
