const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const category = await ctx.db.category.findOne({where : {id : ctx.data.id}})
                if("id" in category){ delete category.id }
                if("createdAt" in category){ delete category.createdAt }
                if("updatedAt" in category){ delete category.updatedAt }
                if("deletedAt" in category){ delete category.deletedAt }
                if("userId" in category){
                    category.user = { connect : { id : category.userId } }
                    delete category.userId
                } 
                query = {
                    data : {
                        ...category
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

            const categoryDuplicate = await ctx.db.category.create(query)

            return categoryDuplicate

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