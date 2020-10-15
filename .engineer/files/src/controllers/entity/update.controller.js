// Imports
const { {{{id}}} } = require('./../../services') 
const { updateService } = {{{id}}}
const { createRequestContext } = require('./../../helpers/createRequestContext')
 
const updateController = async (req, res, next) => {

  try {
    
    // Create request context
    const context = await createRequestContext(req, { ctx : { db : true }, _query : "query", session : true, params : { ['id-as-target'] : true }, ['body-as-data'] : true })

    // Fetch service
    let results = await updateService(context)
    
    if(results.hasOwnProperty('statusCode')){
      res.status(results.statusCode).send(results)
    }else{
      res.send(results)
    }
    next()
  } catch(e) {
    res.sendStatus(500) && next(e)
  }
}
 
module.exports = {
  updateController
}