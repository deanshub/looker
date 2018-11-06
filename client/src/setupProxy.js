
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/api/detect', { target: 'https://localhost:3001', ws: true, secure: false }))
  app.use(proxy('/api/*', { target: 'https://localhost:3001/', secure: false }))
}
