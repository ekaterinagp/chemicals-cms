const router = require("express").Router();

const Warehouse = require("../models/Warehouse");
const WarehouseItem = require("../models/WarehouseItem");

router.get("/currentstock/:id", async (req, res) => {
  const warehouseID = req.params.id;
  const stock = await WarehouseItem.query().where("warehouse_id", warehouseID);
  return res.send(stock);
});

router.get("/warehouses", async (req, res) => {
  // const warehouseId = req.params.id
  const warehouses = await Warehouse.query().select();
  return res.send(warehouses);
});

module.exports = router;
