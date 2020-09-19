const countService = async (ctx)=>{

        try{
         
            let query = {
                ...ctx.query
            }



            const category_logCount = await ctx.db.category_log.count(query)

            return { category_logCount }

        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                error : err
            }
        }
  
}

module.exports = {
    countService
}