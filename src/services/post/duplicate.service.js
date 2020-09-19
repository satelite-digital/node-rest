const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const post = await ctx.db.post.findOne({where : {id : ctx.data.id}})
                if("id" in post){ delete post.id }
                if("createdAt" in post){ delete post.createdAt }
                if("updatedAt" in post){ delete post.updatedAt }
                if("deletedAt" in post){ delete post.deletedAt }
                if("userId" in post){
                    post.user = { connect : { id : post.userId } }
                    delete post.userId
                } 
                query = {
                    data : {
                        ...post
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
       

            
            if('session' in ctx){
                const scope = { user : { connect : { id : ctx.session.user.id  } } }
                if(query.data){
                    Object.assign(query.data, scope)
                }else{
                    query.data = scope
                }
            }

            console.log(query)

            const postDuplicate = await ctx.db.post.create(query)

            return postDuplicate

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