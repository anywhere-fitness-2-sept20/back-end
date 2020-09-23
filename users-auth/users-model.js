const db = require("../database/config");

async function addInstructor(user) {
  const [id] = await db("instructors").insert(user);
  return findInstructorById(id);
}

async function addClient(user) {
  const [id] = await db("clients").insert(user);
  return findClientById(id);
}

function findInstructors() {
  return db("instructors").select("id", "name", "username");
}

function findClients() {
  return db("clients").select("id", "name", "username");
}

function findByInstructorId(id) {
  return db("instructors").select("*").where({ id }).first();
}

function findByClientId(id) {
  return db("clients").select("*").where({ id }).first();
}

function findByInstructors(filter) {
  return db("instructors").select("*").where(filter);
}

function findByClients(filter) {
  return db("clients").select("*").where(filter);
}

function findClasses() {
  return db("classes").select("*");
}

function findClassById(id) {
  return db("classes").select("*").where({ id });
}

module.exports = {
  addInstructor,
  addClient,
  findInstructors,
  findClients,
  findByInstructorId,
  findByClientId,
  findByInstructors,
  findByClients,
  findClasses,
  findClassById,
};
