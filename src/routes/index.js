const auth = require('./auth.routes')
const join = require('./join.routes')
const webhook = require('./webhooks/webhook.routes')
const organization  = require('./organization.routes')
const user  = require('./user.routes')
const app  = require('./app.routes')
const app_log  = require('./app_log.routes')

module.exports = {
    auth,
    join,
    webhook,
    organization,
    user,
    app,
    app_log
}