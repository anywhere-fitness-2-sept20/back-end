exports.up = async function (knex) {
  await knex.schema.createTable("instructors", (table) => {
    table.increments("id");
    table.string("name").notNull().defaultTo("Token Instructor");
    table.string("username", 128).notNull().unique();
    table.string("password", 128).notNull();
    table.string("role").notNull().defaultTo("instructor");
  });

  await knex.schema.createTable("classes", (table) => {
    table.increments("id");
    table.string("name", 128).notNull();
    table.string("type", 128).notNull();
    table.integer("intensity").notNull();
    table.integer("max_clients").notNull();
    table.string("day").notNull();
    table.string("start_time").notNull();
    table.string("location").notNull();
  });

  await knex.schema.createTable("clients", (table) => {
    table.increments("id");
    table.string("name").notNull().defaultTo("Token Client");
    table.string("username", 128).notNull().unique();
    table.string("password", 128).notNull();
    table.string("role").notNull().defaultTo("client");
  });

  await knex.schema.createTable("instructors_classes", (table) => {
    table
      .integer("class_id")
      .notNull()
      .references("id")
      .inTable("classes")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("instructor_id")
      .notNull()
      .references("id")
      .inTable("instructors")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.primary(["instructor_id", "class_id"]);
    //table.array("participants")
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("instructors_classes");
  await knex.schema.dropTableIfExists("clients");
  await knex.schema.dropTableIfExists("classes");
  await knex.schema.dropTableIfExists("instructors");
};
