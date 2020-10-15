// Imports
const { {{{id}}} } = require('./../../services')
const { createService } = {{{id}}}
const { createRequestContext } = require('./../../helpers')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createController = async (req, res, next) => {
  
  try {

    // Create request context
    const context = await createRequestContext(req, { ctx : { db : true }, _query : "query", session : true, body : "data" })

    // Fetch service
    let results = await createService(context)

    // Handle results
    if(results.hasOwnProperty('statusCode')){
      res.status(results.statusCode).send(results)
    }else{
      res.send(results)
    }
    // End
    next()

  } catch(e) {
    res.sendStatus(500) && next(e)
  }
}
 
module.exports = {
  createController
}