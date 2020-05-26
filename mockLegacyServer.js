const express = require('express')
const axios = require('axios')

const server = express()

/**
 * Mock legacy server fakes a SSR web server
 */
server.get('/', async (req, res) => {
  const [fooHtml, fooHtml2, barHtml] = await Promise.all([
    axios.get('http://localhost:8080/foo'),
    axios.post('http://localhost:8080/foo', {
      isBgBlue: true
    }),
    axios.get('http://localhost:8080/bar')
  ])
  res.send(`
  <!DOCTYPE html>
  <html>
    <h1>MOCK LEGACY SERVER MAIN PAGE</h1>
    <h2>This is some legacy content on the page</h2>
    <div>
      <h2>Foo component</h2>
      ${fooHtml.data}
    </div>
    <div>
      <h2>Second Foo component with bg color initially set to blue</h2>
      ${fooHtml2.data}
    </div>
    <div>
      <h2>Bar component</h2>
      ${barHtml.data}
    </div>
    <div>This is some other content rendered by legacy server</div
  </html>
  `)
})

server.get('*', (req, res) => {
  res.redirect(`http://localhost:8080${req.url}`)
})

server.listen(8081)