const db = require("../database/config");

async function addInstructor(user) {
  const [id] = await db("instructors").insert(user);
  return findById(id);
}

async function addClient(user) {
  const [id] = await db("clients").insert(user);
  return findById(id);
}

function findInstructors() {
  return db("instructors").select("id", "name", "username");
}

function findClients() {
  return db("clients").select("id", "name", "username");
}

// Need a find clients ID as well
function findById(id) {
  return db("instructors").select("*").where({ id }).first();
}

function findByInstructors(filter) {
  return db("instructors").select("*").where(filter);
}

function findByClients(filter) {
  return db("clients").select("*").where(filter);
}

module.exports = {
  addInstructor,
  addClient,
  findInstructors,
  findClients,
  findById,
  findByInstructors,
  findByClients,
};
