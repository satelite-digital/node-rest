// Prisma client
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// Libs
const axios = require('axios')
const qs = require('qs')

// Pentcloud tools client
const TOOLS = require('./lib/sdk/index');

// Cognito auth service configuration
const cognitoPool = "us-east-1_tVoVUsvZz"
const cognitoClient = "6f47om3qjiig43skuhl1mo8m4o"
const apiKey = "NBtXzkcTa11ia8G56C60i4vgatiJQeYE3cK3fUFI"

// Cognito as auth service
const cognito = new TOOLS.COGNITO({
  apiKey,
  client : cognitoClient,
  pool : cognitoPool
});

const mail = new TOOLS.MAIL()

module.exports = {
  db : prisma,
  mail,
  auth : cognito,
  libs : {
    qs,
    request : axios
  }
}