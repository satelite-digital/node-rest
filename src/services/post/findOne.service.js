postFindOneLog= async (ctx, record)=>{
    const create = {
        data : {
            post : {
                connect : {
                    id : record.id
                }
            },
            record,
            action : "OPEN"
        }
    }
    if('session' in ctx){
        Object.assign(create.data, { user : { connect : { id : ctx.session.user.id } } })
    }
    return await ctx.db.postLog.create(create)
}

const findOneService = async (ctx)=>{
    try{

        let query = {
            ...ctx.query,
            where : { id : ctx.target, ...ctx.query.where }
        }
        let results = await ctx.db.post.findMany(query);

            const logged = await postFindOneLog(ctx, results[0])
        

        
        return results[0] ? results[0] : results;
    }catch(err){
        return {
            statusCode : 500,
            message : "An error ocurred while processing your request",
            error : err
        }
    }
}

module.exports = {
    findOneService
}