const bcryptjs = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("instructors").insert([
    {
      name: "Charles",
      username: "ExistingInstructor1",
      password: await bcryptjs.hash("instructorPass1", 2),
      role: "instructor",
    },
    {
      name: "Jane",
      username: "ExistingInstructor2",
      password: await bcryptjs.hash("instructorPass2", 2),
      role: "instructor",
    },
  ]);
};
