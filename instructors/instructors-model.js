const db = require("../database/config");

function find() {}

function findById(id) {
  return db("classes").select("*").where({id}).first()
}

function addClass(newClass) {
  const [id] = await db("classes").insert(newClass)
  return findById(id)
}

function update(changes, id) {}

function remove(id) {}

module.exports = {
  find,
  findById,
  addClass,
  update,
  remove,
};
