exports.up = async function (knex) {
  await knex.schema.createTable("instructors", (table) => {
    table.increments("id");
    table.string("name").notNull().defaultTo("Token Instructor");
    table.string("username", 128).notNull().unique();
    table.string("password", 128).notNull();
    table.string("role").notNull().defaultTo("instructor");
  });

  await knex.schema.createTable("clients", (table) => {
    table.increments("id");
    table.string("name").notNull().defaultTo("Token Client");
    table.string("username", 128).notNull().unique();
    table.string("password", 128).notNull();
    table.string("role").notNull().defaultTo("client");
  });

  await knex.schema.createTable("classes", (table) => {
    table.increments("id");
    table.string("image_url").defaultTo("");
    table.string("name", 128).notNull();
    table.string("type", 128).notNull();
    table.integer("intensity").notNull();
    table.integer("max_clients").notNull();
    table.string("day").notNull();
    table.string("start_time").notNull();
    table.string("duration").notNull();
    table.string("location").notNull();
    table.integer("instructor_id").references("id").inTable("instructors");
  });

  await knex.schema.createTable("classes_clients", (table) => {
    table.integer("client_id").references("id").inTable("clients");
    table.integer("class_id").references("id").inTable("classes");
    table.primary(["client_id", "class_id"]);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("classes_clients");
  await knex.schema.dropTableIfExists("clients");
  await knex.schema.dropTableIfExists("classes");
  await knex.schema.dropTableIfExists("instructors");
};
