const bcryptjs = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("instructors").insert([
    {
      name: "Charles",
      username: "existinginstructor1",
      password: await bcryptjs.hash("instructorPass1", 2),
      role: "instructor",
    },
    {
      name: "Jane",
      username: "existinginstructor2",
      password: await bcryptjs.hash("instructorPass2", 2),
      role: "instructor",
    },
  ]);
};
