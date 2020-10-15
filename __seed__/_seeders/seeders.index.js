const user = require('./user.json')
const form = require('./form.json')
const record = require('./record.json')
const hook = require('./hook.json')
const folder = require('./folder.json')


module.exports = [
    { id : "user", data : user },
    { id : "form", data : form },
    { id : "record", data : record },
    { id : "hook", data : hook },
    { id : "folder", data : folder }
]