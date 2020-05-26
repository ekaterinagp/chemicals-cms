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

//{
//   A: 25,
//   B: 15,
//   C: 12,
//   alert: 0,
// }

router.get("/sites", async (req, res) => {
  const warehousesDetails = await WarehouseItem.query();
  // console.log(warehousesDetails);

  const sites = {
    site1A: null,
    site1B: null,
    site1C: null,
    site1alert: 0,
    site2A: null,
    site2B: null,
    site2C: null,
    site2alert: 0,
  };

  warehousesDetails.forEach((warehouse) => {
    if (warehouse.warehouse_id > 5) {
      if (warehouse.chemical == "A") {
        sites.site2A = sites.site2A + warehouse.amount;
      }
      if (warehouse.chemical == "B") {
        sites.site2B = sites.site2B + warehouse.amount;
      }
      if (warehouse.chemical == "C") {
        sites.site2C = sites.site2C + warehouse.amount;
      }
      if (sites.site2A > 15) {
        sites.site2alert = 1;
      }
    } else {
      if (warehouse.chemical == "A") {
        sites.site1A = sites.site1A + warehouse.amount;
      }
      if (warehouse.chemical == "B") {
        sites.site1B = sites.site1B + warehouse.amount;
      }
      if (warehouse.chemical == "C") {
        sites.site1C = sites.site1C + warehouse.amount;
      }
      if (sites.site1A > 15) {
        sites.site1alert = 1;
      }
    }
  });

  return res.send(sites);
});

router.get("/sitesTotalA", async (req, res) => {
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
