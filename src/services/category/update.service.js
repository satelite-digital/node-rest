categoryUpdateLog= async (ctx, record)=>{
    const create = {
        data : {
            category : {
                connect : {
                    id : record.id
                }
            },
            record,
            action : "UPDATE"
        }
    }
    if('session' in ctx){
        Object.assign(create.data, { user : { connect : { id : ctx.session.user.id } } })
    }
    return await ctx.db.categoryLog.create(create)
}


const categoryDBUpdate = async (ctx, data)=>{
    let query = {
        ...ctx.query,
        where : {
            id : ctx.target
        },
        data : {
        ...data,
        updatedAt : new Date()
        }
    }

    const category = await ctx.db.category.update(query)
    const logged = await categoryUpdateLog(ctx, category)

    return category
}

const updateService = async (ctx)=>{

        try{

            let dataItem = JSON.parse(JSON.stringify(ctx.data))


            const category = await categoryDBUpdate(ctx, dataItem)

            return category
         
           

        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                error : err
            }
        }

    
  
}

module.exports = {
    updateService
}