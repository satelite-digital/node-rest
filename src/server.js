const bodyParser = require('body-parser')
const cors = require('cors')

const { authMiddleware, contextMiddleware, queryParserMiddleware } = require('./middlewares')
const { auth, join, webhook, user, post, category, category_log, post_log } = require('./routes');

const express = require('express')

const createServer = (ctx)=>{


  return express()
  .use(bodyParser.json())
  .use(contextMiddleware(ctx))
  .use(queryParserMiddleware)
  .use(cors())
  .use('/', auth)
  .use('/api/', authMiddleware, join, webhook, user, post, category, category_log, post_log)
  .listen(3000, () => console.log('Server ready at: http://localhost:3000\n please refer to http://localhost:3000/specs/api for deailed API specification'))
  
}

module.exports = {
  createServer
} 