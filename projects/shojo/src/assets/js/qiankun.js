import { loadMicroApp } from 'qiankun'

const isDev = process.env.NODE_ENV === 'development'

const loadSubApp = (name, port) => {
  return loadMicroApp({
    name,
    entry: isDev ? `//localhost:${port}` : `https://web.calibur.tv/${name}`,
    container: `#_${name}`
  })
}

export const AppHeader = () => {
  return [loadSubApp('sign', 7103)]
}

export const AboutPage = () => {
  return [loadSubApp('other', 7102)]
}

export const HomePage = () => {
  return [loadSubApp('uploader', 7101), loadSubApp('other', 7102)]
}
