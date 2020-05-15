exports.up = function (knex) {
  return knex.schema
    .createTable("warehouse", (table) => {
      table.integer("id").primary().unsigned().notNullable();
      table.integer("capacity").unsigned();
      table.integer("current_stock").unsigned();
    })
    .createTable("job", (table) => {
      table.bigIncrements("id").primary().unsigned().notNullable();
      table.string("chemical1").notNullable();
      table.integer("amount_ch_1").notNullable();
      table.string("chemical2");
      table.integer("amount_ch_2");
      table.string("type", 1).notNullable();
      table.integer("site_id").unsigned().notNullable();
      table.integer("warehouse_id").unsigned().notNullable();
      table
        .foreign("warehouse_id")
        .references("warehouse.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamp("date").notNullable().defaultTo(knex.fn.now());
    })
    .createTable("jobItem", (table) => {
      table.bigIncrements("id").primary().unsigned().notNullable();
      table.bigInteger("job_id").unsigned().notNullable();
      table.string("chemical").notNullable();
      table.integer("amount").unsigned();
      table
        .foreign("job_id")
        .references("job.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("warehouse_id").unsigned().notNullable();
      table
        .foreign("warehouse_id")
        .references("warehouse.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("warehouseitem", (table) => {
      table.bigIncrements("id").primary().unsigned().notNullable();
      table.string("chemical").notNullable();
      table.integer("amount").unsigned();
      table.integer("warehouse_id").unsigned().notNullable();
      table
        .foreign("warehouse_id")
        .references("warehouse.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("audit", (table) => {
      table.increments("id").primary().unsigned().notNullable();
      table.string("type", 1).notNullable();
      table.string("chemical").notNullable();
      table.integer("warehouse_id").unsigned().notNullable();
      table.integer("site_id").unsigned().notNullable();
      table.integer("amount").unsigned().notNullable();
      table.timestamp("date").notNullable().defaultTo(knex.fn.now());
    })
    .createTable("user", (table) => {
      table.increments("id").primary().unsigned().notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("warehouse")
    .dropTableIfExists("warehouseitem")
    .dropTableIfExists("job")
    .dropTableIfExists("jobItem")
    .dropTableIfExists("audit")
    .dropTableIfExists("user");
};
