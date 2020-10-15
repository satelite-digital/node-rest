// Imports
const { {{{id}}} } = require('./../../services')
const { countService } = {{{id}}}
const { createRequestContext } = require('./../../helpers')

const countController = async (req, res, next) => {
  try {

      // Create request context
      const context = await createRequestContext(req, { ctx : { db : true }, _query : "query", session : true  })

      // Fetch service(s)
      const results = await countService(context)

      // Handle results
      if(results.hasOwnProperty('statusCode')){
        res.status(results.statusCode).send(results)
      }else{
        res.send(results)
      }

      // End
      next()
    
  } catch(e) {
    console.log(e)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
  countController
}