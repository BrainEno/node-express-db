const dbEngine = procees.env.DB_ENVIRONMENT ||'development';
const config = requier('./knexfile')[dbEngine]

module.exports = require('knex')(config)