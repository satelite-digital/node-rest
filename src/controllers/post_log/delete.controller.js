const { post_log } = require('./../../services')
 
const { deleteService } = post_log
 
const deleteController = async (req, res, next) => {
  const { ctx, _query, params, session } = req
  const { db } = ctx 

  try {
    let context = {
      db : {
        post_log : db.post_log
      },
      session,
      query : _query,
      target : params.id
    }

    let results = await deleteService(context)
    
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
  deleteController
}