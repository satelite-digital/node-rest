const utilsResources = function(){
    return [
    // README.md
    {
        "src" : "./.engineer/files/README.md",
        "dest" : "./README.md"
      },
      // Prisma model
      {
        "src" : "./.engineer/files/prisma/schema.prisma",
        "dest" : "./prisma/schema.prisma"
      }
    ]
}

const serverResources = function(){
    return [
    // Server routes
      // index.js
      {
        "src" : "./.engineer/files/src/routes/index.js",
        "dest" : "./src/routes/index.js"
      },
      // entity routes
      {
        "src" : "./.engineer/files/src/routes/entity.routes.js",
        "dest" : "./src/routes/[id].routes.js",
        "key" : "model"
      },
      // Controllers
      // index.js
      {
        "src" : "./.engineer/files/src/controllers/index.js",
        "dest" : "./src/controllers/index.js"
      },
      // entity controllers index.js
      {
        "src" : "./.engineer/files/src/controllers/entity/index.js",
        "dest" : "./src/controllers/[id]/index.js",
        "key" : "model"
      },
      // controller files
      {
        "src" : "./.engineer/files/src/controllers/entity/findOne.controller.js",
        "dest" : "./src/controllers/[id]/findOne.controller.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/controllers/entity/findMany.controller.js",
        "dest" : "./src/controllers/[id]/findMany.controller.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/controllers/entity/create.controller.js",
        "dest" : "./src/controllers/[id]/create.controller.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/controllers/entity/update.controller.js",
        "dest" : "./src/controllers/[id]/update.controller.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/controllers/entity/delete.controller.js",
        "dest" : "./src/controllers/[id]/delete.controller.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/controllers/entity/count.controller.js",
        "dest" : "./src/controllers/[id]/count.controller.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/controllers/entity/duplicate.controller.js",
        "dest" : "./src/controllers/[id]/duplicate.controller.js",
        "key" : "model"
      },
      // User specific controllers
      {
        "src" : "./.engineer/files/src/controllers/user/create.controller.js",
        "dest" : "./src/controllers/user/create.controller.js",
      },
      {
        "src" : "./.engineer/files/src/controllers/user/delete.controller.js",
        "dest" : "./src/controllers/user/delete.controller.js",
      },
      {
        "src" : "./.engineer/files/src/controllers/user/update.controller.js",
        "dest" : "./src/controllers/user/update.controller.js",
      },
      // Services
      // index.js
      {
        "src" : "./.engineer/files/src/services/index.js",
        "dest" : "./src/services/index.js"
      },
      // entity services index.js
      {
        "src" : "./.engineer/files/src/services/entity/index.js",
        "dest" : "./src/services/[id]/index.js",
        "key" : "model"
      },
      // services files
      {
        "src" : "./.engineer/files/src/services/entity/findOne.service.js",
        "dest" : "./src/services/[id]/findOne.service.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/services/entity/findMany.service.js",
        "dest" : "./src/services/[id]/findMany.service.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/services/entity/create.service.js",
        "dest" : "./src/services/[id]/create.service.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/services/entity/update.service.js",
        "dest" : "./src/services/[id]/update.service.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/services/entity/delete.service.js",
        "dest" : "./src/services/[id]/delete.service.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/services/entity/count.service.js",
        "dest" : "./src/services/[id]/count.service.js",
        "key" : "model"
      },
      {
        "src" : "./.engineer/files/src/services/entity/duplicate.service.js",
        "dest" : "./src/services/[id]/duplicate.service.js",
        "key" : "model"
      },
      // User specific services
      {
        "src" : "./.engineer/files/src/services/user/create.service.js",
        "dest" : "./src/services/user/create.service.js",
      },
      {
        "src" : "./.engineer/files/src/services/user/delete.service.js",
        "dest" : "./src/services/user/delete.service.js",
      },
      {
        "src" : "./.engineer/files/src/services/user/update.service.js",
        "dest" : "./src/services/user/update.service.js",
      },
       // Server function
       {
        "src" : "./.engineer/files/src/server.js",
        "dest" : "./src/server.js"
      }
    ]
  }

const seederResources = ()=>{
  return [
    {
      "src" : "./.engineer/files/seeder/index.js",
      "dest" : "./__seed__/seeders/seeders.index.js"
    },
    {
      "src" : "./.engineer/files/seeder/entity.json",
      "dest" : "./__seed__/seeders/[id].json",
      "key" : "model",
      "if" : (model)=>{
        return model.id !== 'user'
      }
    }
  ]
}

const index = {
    utilsResources,
    serverResources,
    seederResources
}

module.exports = index