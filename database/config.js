const knex = require("knex");
const knexfile = require("../knexfile");
const { testing } = require("../knexfile");

const env = process.env.NODE_ENV;

module.exports = knex(knexfile[env]);
