const { category_log } = require('./../../services')

const { createService } = category_log
 
const createController = async (req, res, next) => {
  const { ctx, _query, body, session } = req
  const { db } = ctx 
  
  try {

    let context = {
      db : {
        category_log : db.category_log
      },
      session,
      query : _query,
      data : body
    }

    let results = await createService(context)

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
  createController
}