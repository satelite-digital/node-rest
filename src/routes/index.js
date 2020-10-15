const auth = require('./auth.routes')
const join = require('./join.routes')
const webhook = require('./webhooks/webhook.routes')
const user  = require('./user.routes')
const profile  = require('./profile.routes')
const form  = require('./form.routes')
const folder  = require('./folder.routes')
const folder_share  = require('./folder_share.routes')
const form_share  = require('./form_share.routes')
const form_log  = require('./form_log.routes')
const folder_log  = require('./folder_log.routes')
const hook  = require('./hook.routes')
const form_tag  = require('./form_tag.routes')
const form_form_tag  = require('./form_form_tag.routes')
const record  = require('./record.routes')
const assignation  = require('./assignation.routes')
const pivot_state  = require('./pivot_state.routes')

module.exports = {
    auth,
    join,
    webhook,
    user,
    profile,
    form,
    folder,
    folder_share,
    form_share,
    form_log,
    folder_log,
    hook,
    form_tag,
    form_form_tag,
    record,
    assignation,
    pivot_state
}