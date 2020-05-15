exports.seed = function (knex) {
  return knex("warehouse")
    .insert([
      {
        id: 1,
        capacity: 10,
        current_stock: 3,
      },
      {
        id: 2,
        capacity: 12,
        current_stock: 6,
      },
      {
        id: 3,
        capacity: 5,
        current_stock: 1,
      },
      {
        id: 4,
        capacity: 3,
        current_stock: 4,
      },
      {
        id: 5,
        capacity: 9,
        current_stock: 3,
      },
      {
        id: 6,
        capacity: 10,
        current_stock: 6,
      },
      {
        id: 7,
        capacity: 12,
        current_stock: 1,
      },
      {
        id: 8,
        capacity: 5,
        current_stock: 4,
      },
      {
        id: 9,
        capacity: 3,
        current_stock: 3,
      },
      {
        id: 10,
        capacity: 9,
        current_stock: 6,
      },
    ])
    .then(() => {
      return knex("job").insert([
        {
          chemical1: "A",
          amount_ch_1: 2,
          chemical2: "C",
          amount_ch_2: 3,
          type: "I",
          site_id: 1,
          warehouse_id: 5,
        },
        {
          chemical1: "B",
          amount_ch_1: 1,
          chemical2: "C",
          amount_ch_2: 1,
          type: "O",
          site_id: 2,
          warehouse_id: 6,
        },
        {
          chemical1: "A",
          amount_ch_1: 1,
          chemical2: null,
          amount_ch_2: null,
          type: "I",
          site_id: 2,
          warehouse_id: 8,
        },
        {
          chemical1: "B",
          amount_ch_1: 2,
          chemical2: null,
          amount_ch_2: null,
          type: "O",
          site_id: 1,
          warehouse_id: 2,
        },
        {
          chemical1: "A",
          amount_ch_1: 5,
          chemical2: null,
          amount_ch_2: null,
          type: "O",
          site_id: 2,
          warehouse_id: 10,
        },
        {
          chemical1: "B",
          amount_ch_1: 1,
          chemical2: "C",
          amount_ch_2: 1,
          type: "I",
          site_id: 2,
          warehouse_id: 7,
        },
      ]);
    })
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
      return knex("audit").insert([
        {
          type: "I",
          chemical: "A",
          warehouse_id: 2,
          site_id: 1,
          amount: 1,
        },
        {
          type: "O",
          chemical: "B",
          warehouse_id: 3,
          site_id: 1,
          amount: 5,
        },
        {
          type: "I",
          chemical: "C",
          warehouse_id: 6,
          site_id: 2,
          amount: 6,
        },
        {
          type: "O",
          chemical: "B",
          warehouse_id: 4,
          site_id: 1,
          amount: 2,
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
