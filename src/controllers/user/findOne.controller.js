// Imports
const { user } = require('./../../services')
const { findOneService } = user
const { createRequestContext } = require('./../../helpers/createRequestContext')
 
const findOneController = async (req, res, next) => {

  try {

      // Create request context
      const context = await createRequestContext(req, { ctx : { db : true }, _query : "query", session : true, params : { ['id-as-target'] : true } })

      // Fetch Service
      let results = await findOneService(context)
      
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
  findOneController
}