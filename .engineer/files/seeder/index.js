const user = require('./user.json')
{{#each model}}
const {{id}} = require('./{{id}}.json')
{{/each}}


module.exports = [
    { id : "user", data : user },
    {{#each model}}
    { id : "{{id}}", data : {{id}} },
    {{/each}}
]