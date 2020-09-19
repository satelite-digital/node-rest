categoryDeleteLog = async (ctx, record)=>{
    const create = {
        data : {
            category : {
                connect : {
                    id : record.id
                }
            },
            record,
            action : "DELETE"
        }
    }
    if('session' in ctx){
        Object.assign(create.data, { user : { connect : { id : ctx.session.user.id } } })
    }
    return await ctx.db.categoryLog.create(create)
}


const deleteService = async (ctx)=>{
    let query = {
        ...ctx.query,
        where : { id : ctx.target }
      }
      try{

         const deleted = await ctx.db.category.update({
          ...query,
          data : {
            deletedAt : new Date(),
            isArchived : true
          }
        })

            const logged = await categoryDeleteLog(ctx, deleted)
        
        return deleted

      }catch(err){
        return {
            statusCode : 404,
            message : "Record not found"
        }
      }
}

module.exports = {
    deleteService
}