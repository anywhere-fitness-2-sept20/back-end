const db = require("../database/config");

// I dont think this function is required.
// findClassById seems to do the job just fine.
function findClass() {}

function findInstructorClasses(id) {
  // return db("classes").select("*").where({ instructor_id: id });
  return db("classes_clients")
    .join("classes", "classes.id", "classes_clients.class_id")
    .join("clients", "clients.id", "classes_clients.client_id")
    .join("instructors", "classes.instructor_id", "instructors.id")
    .where({ instructor_id: id })
    .select(
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

function findClassById(id) {
  return db("classes").select("*").where({ id }).first();
}

async function addClass(newClass) {
  const [id] = await db("classes").insert(newClass);
  return findClassById(id);
}

async function updateClass(id, changes) {
  await db("classes").where({ id }).update(changes);
  return findClassById(id);
}

function removeClass(id) {
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
