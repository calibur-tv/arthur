workbox.routing.registerRoute(
  /\.(mp4|mp3)$/,
  new workbox.strategies.CacheFirst({
    plugins: [new workbox.rangeRequests.RangeRequestsPlugin()]
  }),
  'GET'
)
