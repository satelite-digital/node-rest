const { {{{id}}} } = require('./../../services')
 
const { duplicateService } = {{{id}}}
 
const duplicateController = async (req, res, next) => {
  const { ctx, _query, session, body } = req
  const { db } = ctx 
  try {

      let context = {
        db : {
          {{{id}}} : db.{{{id}}}
        },
        session,
        data : body,
        query : _query
      }
      
      let results = await duplicateService(context)
      
      if(results.hasOwnProperty('statusCode')){
        res.status(results.statusCode).send(results)
      }else{
        res.send(results)
      }
      next()
  
    
  } catch(e) {
    console.log(e)
    res.sendStatus(500) && next(e)
  }
}
 
module.exports = {
  duplicateController
}