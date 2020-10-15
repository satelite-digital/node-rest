const auth = require('./auth')
const join = require('./join')
const webhook = require('./webhooks')
const user = require('./user')
const profile = require('./profile')
const form = require('./form')
const folder = require('./folder')
const folder_share = require('./folder_share')
const form_share = require('./form_share')
const form_log = require('./form_log')
const folder_log = require('./folder_log')
const hook = require('./hook')
const form_tag = require('./form_tag')
const form_form_tag = require('./form_form_tag')
const record = require('./record')
const assignation = require('./assignation')
const pivot_state = require('./pivot_state')

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