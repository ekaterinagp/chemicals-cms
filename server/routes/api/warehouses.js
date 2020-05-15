const router = require("express").Router();

const Warehouse = require("../models/Warehouse");
const WarehouseItem = require("../models/WarehouseItem");
const Job = require("../models/Job");
const JobItem = require("../models/JobItem");

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

router.post("/processJob", async (req, res) => {
  const { job } = req.body;
  let siteID;
  let newJob;
  let newJobItem;
  let udpatedWarehouseStock;

  if (job.placementArray[0].Warehouse <= 5) {
    siteID = 1;
  } else {
    siteID = 2;
  }
  try {
    newJob = await Job.query().insert({
      type: "O",
      site_id: siteID,
    });
    console.log(newJob.id);
    // let jobId = newJob.nJobID
    // console.log(jobId)
    job.placementArray.map(async (item) => {
      newJobItem = await JobItem.query().insert({
        amount: item.amount,
        chemical: item.chemical,
        job_id: newJob.id,
        warehouse_id: item.warehouse,
      });
      if (job.type === "outgoing") {
        udpatedWarehouseStock = await WarehouseItem.query()
          .decrement("amount", item.amount)
          .where("warehouse_id", item.warehouse)
          .andWhere("chemical", item.chemical);
      } else {
        udpatedWarehouseStock = await WarehouseItem.query()
          .increment("amount", item.amount)
          .where("warehouse_id", item.warehouse)
          .andWhere("chemical", item.chemical);
      }
    });
    return res.send({ response: "sucess" });
  } catch (err) {
    if (err) {
      console.log(error);
      return res.send({ error: "could not update db" });
    }
  }
});

module.exports = router;
