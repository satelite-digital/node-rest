{{#if options.log}}
{{#each options.log.actions}}
{{#if delete}}

/**
 * # logDelete
 * 
 * ```
 * const log = await logDelete(ctx)
 * ```
 * 
 * A hook function that will take a service context object to write a log record to the database according to this entities ({{name}}) log configuration.
 * 
 * @param {object} ctx - An object containing the following:
 * 
 * ```
 * { 
 *  db : { 
 *      {{@root.options.log.logger}} : {
 *          create : (query)=>{ // a create method that takes an object to generate record on the database }
 *      }
 *  }
 * }
 * ```
 * @param {object} record - An object containing at least:
 * ```
 * {
{{#if @root.options.log.foreign}}
 *  {{@root.options.log.foreign}}Id : "UUID"
{{else}}
 *  id : "UUID",
{{/if}}
 * ... // object representation of a record
 * }
 * ```
 */
const logDelete = async (ctx, record)=>{
    const create = {
        data : {
            {{@root.options.log.data}} : {
                connect : {
                    {{#if @root.options.log.foreign}}
                    id : record.{{@root.options.log.foreign}}Id
                    {{else}}
                    id : record.id
                    {{/if}}
                }
            },
            record,
            action : "{{use}}"
        }
    }
    if('session' in ctx){
        Object.assign(create.data, { user : { connect : { id : ctx.session.user.id } } })
    }
    return await ctx.db.{{@root.options.log.logger}}.create(create)
}
{{/if}}
{{/each}}
{{/if}}

/**
 * # deleteFromDB
 * ```
 * const log = await deleteFromDB(ctx)
 * ```
 * A function that will take a service context object to delete an {{id}} record from the database where id equals ctx.target
 * 
 * @param {object} ctx - An object containing the following:
 * ```
 * {  
 *  db : {
 *      {{id}} : {
 *          delete : (query)=>{ // a method that will take a query to delete {{id}} record from the db },
 *          update : (query)=>{ // a method that will take a query to update (softDelete) an {{id}} record from the db }
 *      }
 *  },
 *  query : { // an object containing a query to append to generated query },
 *  target : "UUID" // UUID of the record to delete
 * }
 * ```
 * 
 * Returns an object containing the deleted record or an error containing the details
 * 
 */
const deleteFromDB = async (ctx)=>{
    try{
        let query = {
            ...ctx.query,
            where : { id : ctx.target }
        }

        {{#if options.softDelete}}
         const deleted = await ctx.db.{{{id}}}.update({
          ...query,
          data : {
            deletedAt : new Date(),
            {{{options.softDelete}}} : true
          }
        })
        {{else}}
        const deleted = await ctx.db.{{{id}}}.delete({  ...query })
        {{/if}}

        return deleted

    }catch(err){
        return {
            statusCode : 500,
            message : "A problem ocurred while processing query",
            err
        }
    }
}


/**
 * # deleteService
 * 
 * ```
 * const log = await logDelete(ctx)
 * ```
 * 
 * This function takes a service context object to delete a {{id}} record from the database, as well as executing any required hooks (such as logging, mailing, etc.)
 * 
 * @param {object} ctx - An object containing the following:
 * ```
 * 
 * {
 *   db : {
 *     form : {
 *       delete : ()=>{},
 *       update : ()=>{}
 *   },
 *   formLog : {
 *     create : ()=>{}
 *   }
 * },
 * query : {},
 * target : "UUID"
 * }
 * 
 * ``` 
 * 
 * Returns an object containing the deleted record or an error containing the details
 * 
 */
const deleteService = async (ctx)=>{
    
      try{

        // Delete from db
        const deleted = await deleteFromDB(ctx)

        // Log 
        {{#if options.log}}
        {{#each options.log.actions}}
        {{#if delete}}
        const logged = await logDelete(ctx, deleted)
        {{/if}}
        {{/each}}
        {{/if}}
        
        return deleted

      }catch(err){
        return {
            statusCode : 500,
            message : "Could not delete record",
            err
        }
      }
}

module.exports = {
    {{#if options.log}}
    {{#each options.log.actions}}
    {{#if delete}}
    logDelete,
    {{/if}}
    {{/each}}
    {{/if}}
    deleteService,
    deleteFromDB
}