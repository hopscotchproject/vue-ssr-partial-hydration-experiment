/**
 * Helper server is for assiting init partial hydration in dev mode
 * when renderer server is reloaded by nodemon
 */

const server = require('express')()

server.get('/init', (req, res) => {
  res.header('Content-Type', 'application/javascript')
  res.send(`
    window.__APP__.init('${req.query.partialId}')
  `)
})

server.listen(8083)