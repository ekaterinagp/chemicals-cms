exports.seed = function (knex) {
  return knex("warehouse")
    .insert([
      {
        id: 1,
        capacity: 10,
        current_stock: 1,
      },
      {
        id: 2,
        capacity: 12,
        current_stock: 1,
      },
      {
        id: 3,
        capacity: 5,
        current_stock: 0,
      },
      {
        id: 4,
        capacity: 3,
        current_stock: 0,
      },
      {
        id: 5,
        capacity: 9,
        current_stock: 0,
      },
      {
        id: 6,
        capacity: 10,
        current_stock: 0,
      },
      {
        id: 7,
        capacity: 12,
        current_stock: 5,
      },
      {
        id: 8,
        capacity: 5,
        current_stock: 0,
      },
      {
        id: 9,
        capacity: 3,
        current_stock: 2,
      },
      {
        id: 10,
        capacity: 9,
        current_stock: 0,
      },
    ])
    .then(() => {
      return knex("warehouseitem").insert([
        {
          chemical: "A",
          amount: 1,
          warehouse_id: 2,
        },
        {
          chemical: "B",
          amount: 5,
          warehouse_id: 7,
        },
        {
          chemical: "C",
          amount: 1,
          warehouse_id: 1,
        },
        {
          chemical: "A",
          amount: 2,
          warehouse_id: 9,
        },
      ]);
    })
    .then(() => {
      return knex("user").insert([
        {
          email: "admin@chemicals.dk",
          password:
            "$2b$10$G/v/MRwgMgOAtCUCQRKJTO8GRD/rKxyu61J5wfYimsHd0/FSxuVAq",
        },
      ]);
    });
};
