exports.seed = async function (knex) {
  await knex("instructors").truncate();
  await knex("classes").truncate();
  await knex("clients").truncate();
  await knex("instructors_classes").truncate();
};
