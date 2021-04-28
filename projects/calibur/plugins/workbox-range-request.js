workbox.routing.registerRoute(
  /\.(mp4|mp3|webm)/,
  new workbox.strategies.CacheFirst({
    plugins: [new workbox.rangeRequests.RangeRequestsPlugin()]
  }),
  'GET'
)
