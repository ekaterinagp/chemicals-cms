exports.seed = function (knex) {
  return knex("warehouse")
    .del()
    .then(() => {
      return knex("job").del();
    })
    .then(() => {
      return knex("warehouseitem").del();
    })
    .then(() => {
      return knex("audit").del();
    })
    .then(() => {
      return knex("user").del();
    });
};
