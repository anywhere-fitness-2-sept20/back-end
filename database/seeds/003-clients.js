const bcryptjs = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("clients").insert([
    {
      name: "John Doe",
      username: "ExistingClient1",
      password: await bcryptjs.hash("ClientPass1", 2),
      role: "client",
    },
    {
      name: "Jane Doe",
      username: "ExistingClient2",
      password: await bcryptjs.hash("ClientPass2", 2),
      role: "client",
    },
    {
      name: "Billy",
      username: "ExistingClient3",
      password: await bcryptjs.hash("ClientPass1", 2),
      role: "client",
    },
    {
      name: "Another Person",
      username: "ExistingClient4",
      password: await bcryptjs.hash("ClientPass2", 2),
      role: "client",
    },
  ]);
};
