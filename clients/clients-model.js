const db = require("../database/config");

// Function too generic and remains unused
function find() {}

function findClientClass(class_id, client_id) {
  return db("class_clients").where({ class_id, client_id });
}

//Poor naming convention
function findClientsClasses(clientId) {
  return db("classes_clients")
    .join("classes", "classes.id", "classes_clients.class_id")
    .join("clients", "clients.id", "classes_clients.client_id")
    .join("instructors", "classes.instructor_id", "instructors.id")
    .where({ client_id: clientId });
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
  findClientsClasses,
  findClientClass,
  findClientById,
  joinClass,
  updateClient,
  removeClass,
};
