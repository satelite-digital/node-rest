// Imports
const { {{{id}}} } = require('./../../services')
const { deleteService } = {{{id}}}
const { createRequestContext } = require('./../../helpers')
 
const deleteController = async (req, res, next) => {
  
  try {

    // Create request context
    const context = await createRequestContext(req, { ctx : { db : true }, params : { ['id-as-target'] : true}, _query : "query", session : true, body : "data" })

    // Fetch service
    let results = await deleteService(context)
    
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
  deleteController
}