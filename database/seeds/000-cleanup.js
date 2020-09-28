exports.seed = async function (knex) {
  await knex("classes_clients").truncate();
  await knex("clients").truncate();
  await knex("classes").truncate();
  await knex("instructors").truncate();
};
