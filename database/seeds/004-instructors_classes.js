exports.seed = async function (knex) {
  await knex("instructors_classes").insert([
    {
      instructor_id: 1,
      class_id: 1,
      start_time: "12:00",
      location: "San Pedro",
    },
    {
      instructor_id: 1,
      class_id: 2,
      start_time: "12:00",
      location: "San Pedro",
    },
    {
      instructor_id: 2,
      class_id: 3,
      start_time: "12:00",
      location: "San Pedro",
    },
    {
      instructor_id: 2,
      class_id: 4,
      start_time: "12:00",
      location: "San Pedro",
    },
  ]);
};
