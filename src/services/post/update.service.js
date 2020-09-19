postUpdateLog= async (ctx, record)=>{
    const create = {
        data : {
            post : {
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
    return await ctx.db.postLog.create(create)
}


const postDBUpdate = async (ctx, data)=>{
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

    const post = await ctx.db.post.update(query)
    const logged = await postUpdateLog(ctx, post)

    return post
}

const updateService = async (ctx)=>{

        try{

            let dataItem = JSON.parse(JSON.stringify(ctx.data))


            const post = await postDBUpdate(ctx, dataItem)

            return post
         
           

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