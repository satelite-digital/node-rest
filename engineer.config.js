const helloWorldPlugin = require("./.engineer/plugins/helloWorld.plugin");

const main = async ()=>{

  let config = {
    "model" : require('./.engineer/data.json'),
    "options" : {
    },
    "resources" : [
      {
        "src" : "./.engineer/files/code.js",
        "dest" : "./src/code.js"
      },
      {
        "src" : "./.engineer/files/module.js",
        "dest" : "./src/[id]/[id].module.js",
        "key" : "model",
        "if" : (model)=>{
          return model.code
        }
      },
      {
        "src" : "./.engineer/files/other.js",
        "dest" : "./src/[id]/[id].other.js",
        "key" : "model",
        "if" : (model)=>{
          return model.other
        }
      }
    ]
  }

  config = await helloWorldPlugin(config)
  return config

}

module.exports = main()