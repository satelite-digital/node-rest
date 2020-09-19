const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const post_log = await ctx.db.post_log.findOne({where : {id : ctx.data.id}})
                if("id" in post_log){ delete post_log.id }
                if("createdAt" in post_log){ delete post_log.createdAt }
                if("updatedAt" in post_log){ delete post_log.updatedAt }
                if("postId" in post_log){
                    post_log.post = { connect : { id : post_log.postId } }
                    delete post_log.postId
                } 
                if("userId" in post_log){
                    post_log.user = { connect : { id : post_log.userId } }
                    delete post_log.userId
                } 
                query = {
                    data : {
                        ...post_log
                    },
                    ...ctx.query
                }
            }else{
                query = {
                    data :{
                        ...ctx.data
                    },
                    ...ctx.query
                }    
            }
       

            

            console.log(query)

            const post_logDuplicate = await ctx.db.post_log.create(query)

            return post_logDuplicate

        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                error : err
            }
        }
  
}

module.exports = {
    duplicateService
}