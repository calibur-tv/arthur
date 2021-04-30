const baiduStat = `var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?c10304a2f70ee2ddf8d2818551d37a4b";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s)})();`
const baiduPush = `(function(){var bp=document.createElement('script');var curProtocol=window.location.protocol.split(':')[0];if(curProtocol==='https'){bp.src='https://zz.bdstatic.com/linksubmit/push.js'}else{bp.src='http://push.zhanzhang.baidu.com/push.js'}var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(bp,s)})();`
const redirect = `if (window.location.host.split('.').length === 2) {window.location.href="https://www." + window.location.href.split('://')[1]}`
const prefetch = `
if ('serviceWorker' in navigator) {
  caches.open(window.location.pathname).then((cache) => {
    cache.keys().then((keys) => {
      keys.forEach((req) => {
        const config = {
          headers: {}
        }
        config.headers['Content-Type'] = 'application/json'
        config.credentials = 'omit'
        fetch(req, config)
          .then(res => {
            if (!res.ok) {
              return
            }
            caches.open(req).then((cache) => {
              cache.put(req, res)
            })
          })
      })
    })
  })
}
`

export default {
  baiduStat,
  baiduPush,
  redirect,
  prefetch
}
