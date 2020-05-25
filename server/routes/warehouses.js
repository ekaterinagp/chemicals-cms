const router = require("express").Router();

const Warehouse = require("../models/Warehouse");
const WarehouseItem = require("../models/WarehouseItem");

router.get("/currentstock/:id", async (req, res) => {
  const warehouseID = req.params.id;
  const stock = await WarehouseItem.query()
    .select()
    .where("warehouse_id", warehouseID);
  return res.status(200).send(stock);
});

router.get("/details/:id", async (req, res) => {
  const warehouseID = req.params.id;
  const stock = await WarehouseItem.query().where("warehouse_id", warehouseID);
  let details = {
    A: null,
    B: null,
    C: null,
    warehouse: null,
  };
  stock.forEach((one) => {
    if (one.chemical == "A") {
      details.A = one.amount;
    }
    if (one.chemical == "B") {
      details.B = one.amount;
    }
    if (one.chemical == "C") {
      details.C = one.amount;
    }
    details.warehouse = one.warehouse_id;
  });

  return res.send(details);
});

router.get("/warehouses", async (req, res) => {
  // const warehouseId = req.params.id
  const warehouses = await Warehouse.query().select();
  return res.send(warehouses);
});

router.get("/items", async (req, res) => {
  const warehousesDetails = await WarehouseItem.query();
  return res.send(warehousesDetails);
});

router.get("/sites", async (req, res) => {
  const warehousesDetails = await WarehouseItem.query();

  const sites = {
    site1: [],
    site2: [],
  };
  warehousesDetails.forEach((warehouse) => {
    if (warehouse.warehouse_id < 6) {
      sites.site1.push(warehouse);
    } else {
      sites.site2.push(warehouse);
    }
  });

  const totalA = [
    {
      totalA: calculateA(sites.site1),
      site: 1,
    },
    {
      totalA: calculateA(sites.site2),
      site: 2,
    },
  ];

  return res.send(totalA);
});

const calculateA = (site) => {
  let total = 0;
  site.forEach((item) => {
    if (item.chemical == "A") {
      total = total + item.amount;
    }
    console.log(total);
  });
  return total;
};

module.exports = router;
