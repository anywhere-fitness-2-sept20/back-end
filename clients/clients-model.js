const db = require("../database/config");

// Function too generic and remains unused
function find() {}

function findClientClass(class_id, client_id) {
  console.log("model", class_id, client_id);
  return db("classes_clients").where({ client_id: client_id }).select("*");
}

//Poor naming convention
function findClientsClasses(clientId) {
  return db("classes_clients")
    .join("classes", "classes.id", "classes_clients.class_id")
    .join("clients", "clients.id", "classes_clients.client_id")
    .join("instructors", "classes.instructor_id", "instructors.id")
    .where({ client_id: clientId })
    .select(
      "classes.image_url",
      "classes.id as classId",
      "classes.name as className",
      "classes.type",
      "classes.intensity",
      "classes.max_clients",
      "classes.day",
      "classes.start_time",
      "classes.duration",
      "classes.location",
      "clients.id as clientId",
      "clients.name as clientName",
      "instructors.id as instructorId",
      "instructors.name as instructorName"
    );
}

function findClientById(id) {
  return db("clients").select("name", "username", "role").where({ id });
}

// Add function taken care of by users-model.js
async function joinClass(class_id, client_id) {
  await db("classes_clients").insert({ class_id, client_id });
  return;
}

// Function to update client information
async function updateClient(changes, id) {
  await db("clients").where({ id }).update(changes);
  return findClientById(id);
}

function leaveClass(client_id, class_id) {
  console.log("Leave Class", client_id, class_id);
  return db("classes_clients").where({ class_id, client_id }).delete();
}

module.exports = {
  find,
  findClientsClasses,
  findClientClass,
  findClientById,
  joinClass,
  updateClient,
  leaveClass,
};
