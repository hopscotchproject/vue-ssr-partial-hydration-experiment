const isDevelopment = process.env.NODE_ENV === 'development'

// port 8083 is the helper server, it's purely for local dev purpose
const generateInitScript = partialId => 
  `<script src="${isDevelopment ? 'http://localhost:8083' : ''}/init?partialId=${partialId}" defer></script>`

module.exports = {
  generateInitScript
}