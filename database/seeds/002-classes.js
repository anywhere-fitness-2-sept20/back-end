exports.seed = async function (knex) {
  await knex("classes").insert([
    {
      name: "Zumba",
      type: "Aerobic",
      intensity: 4,
      max_clients: 5,
      day: "Wednesday",
      start_time: "12:00",
      duration: "2 hours",
      location: "San Pedro",
    },
    {
      name: "Yoga",
      type: "Aerobic",
      intensity: 2,
      max_clients: 5,
      day: "Wednesday",
      start_time: "12:00",
      duration: "2 hours",
      location: "San Pedro",
    },
    {
      name: "Meditation",
      type: "Aerobic",
      intensity: 1,
      max_clients: 5,
      day: "Wednesday",
      start_time: "12:00",
      duration: "2 hours",
      location: "San Pedro",
    },
    {
      name: "Boxing",
      type: "Aerobic",
      intensity: 4,
      max_clients: 5,
      day: "Wednesday",
      start_time: "12:00",
      duration: "2 hours",
      location: "San Pedro",
    },
  ]);
};
