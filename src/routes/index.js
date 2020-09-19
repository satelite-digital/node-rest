const auth = require('./auth.routes')
const join = require('./join.routes')
const webhook = require('./webhooks/webhook.routes')
const user  = require('./user.routes')
const post  = require('./post.routes')
const category  = require('./category.routes')
const category_log  = require('./category_log.routes')
const post_log  = require('./post_log.routes')

module.exports = {
    auth,
    join,
    webhook,
    user,
    post,
    category,
    category_log,
    post_log
}