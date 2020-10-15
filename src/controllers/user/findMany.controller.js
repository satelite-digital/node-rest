// Imports
const { user } = require('./../../services')
const { findManyService } = user
const { createRequestContext } = require('./../../helpers')
 
const findManyController = async (req, res, next) => {
  
  try {

      // Create request context
      const context = await createRequestContext(req, { ctx : { db : { user : true } }, _query : "query", session : true })

      // Fetch service
      let results = await findManyService(context)
      
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
  findManyController
}