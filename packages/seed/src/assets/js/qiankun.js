import { registerMicroApps } from 'qiankun'

export const bootstrap = () => {
  registerMicroApps([
    {
      name: 'vue-page-01',
      entry: '//localhost:7101',
      container: '#vue-01',
      activeRule: (location) => location.pathname === '/'
    },
    {
      name: 'vue-page-02',
      entry: '//localhost:7101',
      container: '#about-01',
      activeRule: '/about'
    },
    {
      name: 'vue-page-03',
      entry: '//localhost:7101',
      container: '#about-02',
      activeRule: '/about'
    }
  ])
}
