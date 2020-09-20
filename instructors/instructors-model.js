const db = require("../database/config");

function findClass() {}

function findInstructorClasses(id) {
  return db("classes").select("*").where({ instructor_id: id });
}

function findClassById(id) {
  return db("classes").select("*").where({ id }).first();
}

async function addClass(newClass) {
  const [id] = await db("classes").insert(newClass);
  return findClassById(id);
}

async function updateClass(id, changes) {
  console.log("model", id, changes);
  await db("classes").where({ id }).update(changes);
  return findClassById(id);
}

function removeClass(id) {
  console.log("model", id);
  return db("classes").where({ id }).delete();
}

module.exports = {
  findClass,
  findClassById,
  addClass,
  updateClass,
  removeClass,
  findInstructorClasses,
};
