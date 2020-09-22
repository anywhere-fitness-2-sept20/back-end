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
      name: "Billy Batson",
      username: "ExistingClient3",
      password: await bcryptjs.hash("ClientPass3", 2),
      role: "client",
    },
    {
      name: "Bruce Whine",
      username: "ExistingClient4",
      password: await bcryptjs.hash("ClientPass4", 2),
      role: "client",
    },
    {
      name: "Johnny Doe",
      username: "ExistingClient5",
      password: await bcryptjs.hash("ClientPass5", 2),
      role: "client",
    },
    {
      name: "Anonymous Person",
      username: "ExistingClient6",
      password: await bcryptjs.hash("ClientPass6", 2),
      role: "client",
    },
  ]);
};
