const seeders = require("./seeders/seeders.index.js");
const { auth, db, mail } = require('./../src/context')

const raw = require('./raw/index')

const services = require('./../src/services/index')

let seed = async (seeder)=>{
        

        let created = []

        console.log(`Creating data for ${seeder.id} @ ${Date.now().toLocaleString("es-GT")}`)
        console.table(seeder.data)

        for(record in seeder.data){
            let context = {
              db,
              auth,
              mail,
              query : '',
              data : seeder.data[record]
            }
            
            console.log(`Attempting to create record  ${JSON.stringify(seeder.data[record], null, 2)} @ ${Date.now().toLocaleString("es-GT")}`)
            
            const service = seeder.id
            
            const rec = await services[service].createService(context)
            console.log(`Created record: ${JSON.stringify(rec, null, 2)} @ ${Date.now().toLocaleString('es-GT')}`)
            created.push(rec)

        }

        return created
}

const main = async () => {

   // check for select arguments
   let select = false
   if(process.argv.length > 2){
     select = process.argv
     select.splice(0,2)
   };

   console.log(`Migration started at ${Date.now().toLocaleString("es-GT")}`)
  // RAW queries execute
    if(select.includes('raw')){
      console.log(`Raw queries are going to be ran to alter database as required`)
      raw.forEach(raw =>{
        console.log(raw.description)
        const result = db.queryRaw(raw.query)
        console.log(`Raw query executed: ${JSON.stringify(result)}`)
      })
    }
   
    for(seeder in seeders){        
        if(!Array.isArray(select)){
            await seed(seeders[seeder])
        }else if(select.includes(seeders[seeder].id) || select.includes('all')){
            await seed(seeders[seeder])
        }
    }

}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await db.disconnect()
  })
