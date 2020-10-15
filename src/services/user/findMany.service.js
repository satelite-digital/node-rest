const findManyService = async (ctx)=>{
    try{

        let query = {
            ...ctx.query
        }



        if('session' in ctx){
            const multitenancyFilter = { user : {  organizationId : { equals : ctx.session.user.organizationId } } }
            Object.assign(query.where, multitenancyFilter)
        }
        

        let results = await ctx.db.user.findMany(query);
        
        return results;

    }catch(err){
        return {
            statusCode : 500,
            message : "An error ocurred while processing your request",
            error : err
        }
    }
}
    
module.exports = {
    findManyService
}