const countService = async (ctx)=>{

        try{
         
            let query = {
                ...ctx.query
            }



            const post_logCount = await ctx.db.post_log.count(query)

            return { post_logCount }

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