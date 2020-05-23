const express = require('express')
const axios = require('axios')

const server = express()

server.get('/', async (req, res) => {
  const homeHtml = await axios.get('http://localhost:8080')
  const barHtml = await axios.get('http://localhost:8080/bar')
  res.send(`
  <!DOCTYPE html>
  <html>
    <h1>PROXY SERVER MAIN PAGE</h1>
    <div>
      <h2>HOME COMPONENT</h2>
      ${homeHtml.data}
    </div>
    <div>
      <h2>Bar COMPONENT 2</h2>
      ${barHtml.data}
    </div>
  </html>
  `)
})

server.get('*', (req, res) => {
  console.log(req.url)
  res.redirect(`http://localhost:8080${req.url}`)
})

server.listen(8081)