const { join } = require('path')
const express = require('express')
const { v4 } = require('uuid')
const cors = require('cors')
const { createBundleRenderer } = require('vue-server-renderer')
const { generateInitScript } = require('./server-utils')

const server = express()

const template = require('fs').readFileSync(join(__dirname, '../public/index.html'), 'utf-8')
const clientManifest = require(join(__dirname, '../dist/vue-ssr-client-manifest.json'))

const renderer = createBundleRenderer(join(__dirname, '../dist/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template, //(optional) page template
  clientManifest // (optional) client build manifest
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
    partialId: `partial-id-${v4()}`
  }

  // No need to pass an app here because it is auto-created by
  // executing the bundle. Now our server is decoupled from our Vue app!
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.error(err)
      res.status(err.code).send(err.message)
    }

    // Augment SSR'd html with mounting point for hydration
    // Also inject script tag for deferred init
    const augmentedHtml = `
      <div id="${context.partialId}">
        ${html}
        ${generateInitScript(context.partialId)}
        <script>
          if (!window.__VROUTE__) {
            window.__VROUTE__ = {}
          }
          window.__VROUTE__['${context.partialId}'] = '${req.url}'
        </script>
      </div>`
    // handle error...
    res.end(augmentedHtml)
  })
})

server.listen(8080)
