const db = require("../database/config");

function find() {}

function findClientClass(class_id, client_id) {
  return db("class_clients").where({ class_id, client_id });
}

function findClientById(id) {
  return db("clients").select("name", "username", "role").where({ id });
}

// Add function taken care of by users-model.js
async function joinClass(class_id, client_id) {
  // await db("classes_clients").insert({ class_id, client_id });
  return;
}

async function updateClient(changes, id) {
  await db("clients").where({ id }).update(changes);
  return findClientById(id);
}

function removeClass(client_id, class_id) {
  console.log(client_id, class_id);
  return;
}

module.exports = {
  find,
  findClientClass,
  findClientById,
  joinClass,
  updateClient,
  removeClass,
};
