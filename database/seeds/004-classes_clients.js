exports.seed = async function (knex) {
  await knex("classes_clients").insert([
    { class_id: 1, client_id: 1 },
    { class_id: 1, client_id: 2 },
    { class_id: 1, client_id: 3 },
    { class_id: 1, client_id: 4 },
    { class_id: 1, client_id: 5 },
    { class_id: 2, client_id: 1 },
    { class_id: 2, client_id: 2 },
    { class_id: 2, client_id: 3 },
    { class_id: 2, client_id: 4 },
  ]);
};
