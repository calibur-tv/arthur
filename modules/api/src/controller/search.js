import http from '@calibur/http'

export const bangumi = () => http.get('search/bangumi')

export const mixin = ({ q, type }) => http.get('search/mixin', { q, type })
