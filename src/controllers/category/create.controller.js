const { category } = require('./../../services')

const { createService } = category
 
const createController = async (req, res, next) => {
  const { ctx, _query, body, session } = req
  const { db } = ctx 
  
  try {

    let context = {
      db : {
        categoryLog : db.categoryLog,
        category : db.category
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