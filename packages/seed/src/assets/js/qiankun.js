import { loadMicroApp } from 'qiankun'

export const homePage = () => {
  const res1 = loadMicroApp({
    name: 'vue-page-01',
    entry: '//localhost:7102',
    container: '#vue-01'
  })

  return [res1]
}

export const aboutPage = () => {
  const res1 = loadMicroApp({
    name: 'vue-page-02',
    entry: '//localhost:7101',
    container: '#about-01'
  })

  const res2 = loadMicroApp({
    name: 'vue-page-03',
    entry: '//localhost:7102',
    container: '#about-02'
  })

  return [res1, res2]
}
