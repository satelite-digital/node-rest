const { category } = require('./../../services')
 
const { updateService } = category
 

const updateController = async (req, res, next) => {
  const { ctx, body, params, _query, session } = req
  const { db} = ctx 

  try {
    
    let context = {
      db : {
        categoryLog : db.categoryLog,
        category : db.category
      },
      session,
      query : _query,
      target : params.id,
      data : body
    }

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