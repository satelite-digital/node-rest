{{#if options.softDelete}}
const softDeleteFilter = (query)=>{
    const filter = { {{options.softDelete}} : false }
    if('where' in query){
        if(!('{{options.softDelete}}' in query.where)){
            Object.assign(query.where, filter)
        }
    }else{
        query.where = filter
    }
    return query
}
{{/if}}

const countService = async (ctx)=>{

        try{
         
            let query = {
                ...ctx.query
            }

            {{#if options.softDelete}}
            query = softDeleteFilter(query)
            {{/if}}

            {{#if parents}}
                {{#each parents}}
                    {{#if options.isCreator}}
            if('session' in ctx){
                const scope = { userId : ctx.session.user.id  }
                if(query.where){
                    Object.assign(query.where, scope)
                }else{
                    query.where = scope
                }
            }
                    {{/if}}
                {{/each}}
            {{/if}}

            const {{{id}}}Count = await ctx.db.{{{id}}}.count(query)

            return { {{{id}}}Count }

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