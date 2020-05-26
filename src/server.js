const { join } = require('path')
const express = require('express')
const { v4 } = require('uuid')
const cors = require('cors')
const { createBundleRenderer } = require('vue-server-renderer')
const { generateInitScript } = require('./server-utils')

const server = express()

const clientManifest = require(join(__dirname, '../dist/vue-ssr-client-manifest.json'))

const renderer = createBundleRenderer(join(__dirname, '../dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template: (result, context) => `
  <div id="${context.partialId}">
    ${context.renderStyles()}
    ${context.renderResourceHints()}
    ${result}
    ${context.renderState({
      contextKey: 'state',
      windowKey: `__STATE__${context.partialId}`
    })}
    ${context.renderScripts()}
    ${generateInitScript(context.partialId)}
  </div>`,
  clientManifest,
  inject: false, // disable auto injuction to use template for finer control
})

server.use(cors())

server.use('/dist', express.static('./dist'))
// server.use('public', express.static('./public'))
// server.use(express.static('./public'))

server.get('/init', (req, res) => {
  res.header('Content-Type', 'application/javascript')
  res.send(`
    window.__APP__.init('${req.query.partialId}')
  `)
})

// inside a server handler...
server.get('*', (req, res) => {
  res.header('Content-Type', 'text/html')
  const context = {
    url: req.url,
    partialId: `partial_id_${v4().replace(/-/gi, '')}`, // remove hyphen to avoid syntax error when injecting scripts
    body: req.body,
    query: req.query,
    params: req.params
  }

  // No need to pass an app here because it is auto-created by
  // executing the bundle. Now our server is decoupled from our Vue app!
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.error(err)
      res.status(err.code).send(err.message)
    }
    res.end(html)
  })
})

server.listen(8080)
