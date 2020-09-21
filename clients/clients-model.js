const db = require("../database/config");

function find() {}

function findClientById(id) {
  return db("clients").select("name", "username", "role").where({ id });
}

// Add function taken care of by users-model.js
function joinClass(class_id, client_id) {
  await db("classes_clients").insert({class_id, client_id})
}

async function updateClient(changes, id) {
  await db("clients").where({ id }).update(changes);
  return findClientById(id);
}

function remove(id) {}

module.exports = {
  find,
  findClientById,
  joinClass,
  updateClient,
  remove,
};
