const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const category_log = await ctx.db.category_log.findOne({where : {id : ctx.data.id}})
                if("id" in category_log){ delete category_log.id }
                if("createdAt" in category_log){ delete category_log.createdAt }
                if("updatedAt" in category_log){ delete category_log.updatedAt }
                if("userId" in category_log){
                    category_log.user = { connect : { id : category_log.userId } }
                    delete category_log.userId
                } 
                query = {
                    data : {
                        ...category_log
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

            const category_logDuplicate = await ctx.db.category_log.create(query)

            return category_logDuplicate

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