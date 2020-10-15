const resources = require('./.engineer/index')
const { utilsResources, serverResources, seederResources } = resources
const { prismaClientName, fetchSateliteApp } = require('./.engineer/plugins')


const main = async ()=>{
  var config = {
    "options" : {
    },
    "model" : {
      appId : "2aaad9d8-3eb4-4061-9880-52f9d43be801"
    },
    "resources" : [
      // Utils
      ...utilsResources(),
      // Server
      ...serverResources(),
      // Seeder
      // ...seederResources()
      // Add your custom files after this comment
    ]
  }

  config = await fetchSateliteApp(config)

  config = prismaClientName(config)

  return config


}


module.exports = main()