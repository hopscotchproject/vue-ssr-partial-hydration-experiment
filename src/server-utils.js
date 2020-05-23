const isDevelopment = process.env.NODE_ENV === 'development'

const generateInitScript = partialId => 
  `<script src="${isDevelopment ? 'http://localhost:8083' : ''}/init?partialId=${partialId}" defer></script>`

module.exports = {
  generateInitScript
}