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

function findById(id) {
  return db("instructors").select("*").where({ id }).first();
}

function findByInstructors(filter) {
  return db("instructors").select("id", "name", "username").where(filter);
}

function findByClients(filter) {
  return db("clients").select("id", "name", "username").where(filter);
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
