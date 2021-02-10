import { loadMicroApp } from 'qiankun'

export const bootstrap = () => {
  loadMicroApp({
    name: 'vue-page-01',
    entry: '//localhost:7101',
    container: '#vue-01'
  })
}
