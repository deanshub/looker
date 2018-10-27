const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/api/detect', { target: 'http://localhost:3001', ws: true }))
  app.use(proxy('/api/*', { target: 'http://localhost:3001/' }))
}
