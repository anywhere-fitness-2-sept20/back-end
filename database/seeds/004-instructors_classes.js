exports.seed = async function (knex) {
  await knex("instructors_classes").insert([
    {
      instructor_id: 1,
      class_id: 1,
    },
    {
      instructor_id: 1,
      class_id: 2,
    },
    {
      instructor_id: 2,
      class_id: 3,
    },
    {
      instructor_id: 2,
      class_id: 4,
    },
  ]);
};
