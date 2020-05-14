exports.up = function (knex) {
  return knex.schema
    .createTable("warehouse", (table) => {
      table.increments("id").primary().unsigned().notNullable();
      table.integer("site_id").unsigned().notNullable();
      table.integer("capacity").unsigned();
      table.integer("current_stock").unsigned();
    })
    .createTable("chemicalStock", (table) => {
      table.increments("id").primary().unsigned().notNullable();
      table.integer("stock").unsigned();
      table.integer("warehouse_id").references("id").inTable("warehouse");
    })
    .createTable("job", (table) => {
      table.bigIncrements("id").primary().unsigned().notNullable();
      table.string("type", 1).notNullable();
      table.timestamp("date").notNullable().defaultTo(knex.fn.now());
      table.integer("total_amount").unsigned();
    })
    .createTable("jobItem", (table) => {
      table.bigIncrements("id").primary().unsigned().notNullable();
      table.integer("amount").unsigned().notNullable();
      table.bigInteger("job_id").unsigned().notNullable();
      table.foreign("job_id").references("id").inTable("job");
      table.integer("chemical_id").unsigned().notNullable();
      table.integer("warehouse_id").unsigned().notNullable();
      table.foreign("warehouse_id").references("id").inTable("warehouse");
    })
    .createTable("audit", (table) => {
      table.increments("id").primary().unsigned().notNullable();
      table.string("type", 1).notNullable();
      table.integer("chemical_id").unsigned().notNullable();
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
    .dropTableIfExists("chemicalStock")
    .dropTableIfExists("job")
    .dropTableIfExists("jobItem")
    .dropTableIfExists("audit")
    .dropTableIfExists("user");
};
