Why
- 当你使用微前端作为开发框架的时候，子应用和父应用之间是完全无依赖耦合的，这样在`ToB`的项目中比较好，但是在`ToC`的项目中
会存在性能问题
- 面对`ToC`的场景，我们可以使用`webpack5`的`Module Federation`来实现，也可以使用统一依赖的微前端方案
- 对于`Module Federation`，它的限制我还不清楚，未来再研究吧
- 对于微前端，可以使用这个包来在开发子包时注入依赖

Usage

```shell
yarn add @calibur/mfe-loader
```

Import

```javascript
import bootstrap from '@calibur/mfe-loader'

const dependencies = [
  {
    global: 'Vue',
    resource: [
      'https://unpkg.com/vue@next'
    ]
  },
  {
    global: 'ElementPlus',
    resource: [
      'https://unpkg.com/element-plus',
      'https://unpkg.com/element-plus/lib/theme-chalk/index.css',
      'https://unpkg.com/normalize.css'
    ]
  },
  {
    global: 'Cookies',
    resource: [
      'https://unpkg.com/js-cookie'
    ]
  },
  {
    global: 'Flowlist',
    resource: [
      'https://unpkg.com/@flowlist/vue-listview'
    ]
  }
]

bootstrap(dependencies).then(() => {
  const { createApp } = Vue
  const app = createApp({})
  // do something...
}).catch(err => {
  // some module load failed
})
```
