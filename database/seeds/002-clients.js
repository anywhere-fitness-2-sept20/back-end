const bcryptjs = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("clients").insert([
    {
      name: "John Doe",
      username: "existingclient1",
      password: await bcryptjs.hash("ClientPass1", 2),
      role: "client",
    },
    {
      name: "Jane Doe",
      username: "existingclient2",
      password: await bcryptjs.hash("ClientPass2", 2),
      role: "client",
    },
    {
      name: "Billy Batson",
      username: "existingclient3",
      password: await bcryptjs.hash("ClientPass3", 2),
      role: "client",
    },
    {
      name: "Bruce Whine",
      username: "existingclient4",
      password: await bcryptjs.hash("ClientPass4", 2),
      role: "client",
    },
    {
      name: "Johnny Doe",
      username: "existingclient5",
      password: await bcryptjs.hash("ClientPass5", 2),
      role: "client",
    },
    {
      name: "Anonymous Person",
      username: "existingclient6",
      password: await bcryptjs.hash("ClientPass6", 2),
      role: "client",
    },
  ]);
};
