// 放这里：VoiceHub 项目 server/middleware/api-0-open-cors.ts
const ALLOWED_ORIGINS = new Set([
  'https://yuzikaaang.github.io',
  'https://zikang0529.gitee.io',
  'http://localhost:8899',
  'http://127.0.0.1:8899',
  'https://a5048c773a210b3d4-25579.app.workbuddy.link', 
])
export default defineEventHandler((event) => {
  const { pathname } = getRequestURL(event)
  if (!pathname.startsWith('/api/open/')) return
  const origin = getHeader(event, 'origin')
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': origin,
      'Vary': 'Origin',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
      'Access-Control-Max-Age': '86400'
    })
  }
  if (getMethod(event) === 'OPTIONS') {
    setResponseStatus(event, 204)
    return null
  }
})
