const router = require("express").Router();

const Warehouse = require("../models/Warehouse");
const WarehouseItem = require("../models/WarehouseItem");
const Job = require("../models/Job");
const JobItem = require("../models/JobItem");
const Audit = require("../models/Audit");

router.post("/processJob", async (req, res) => {
  const job = req.body;
  console.log(req.body);
  console.log(job);
  let siteID;

  let jobType;
  if (job.type === "outgoing") {
    jobType = "O";
  } else {
    jobType = "I";
  }
  if (job.placementArray[0].warehouse <= 5) {
    siteID = 1;
  } else {
    siteID = 2;
  }
  try {
    let newJob = await Job.query().insert({
      type: jobType,
      site_id: siteID,
    });
    console.log(newJob.id);
    // let jobId = newJob.nJobID
    // console.log(jobId)
    job.placementArray.map(async (item) => {
      await JobItem.query().insert({
        amount: item.amount,
        chemical: item.chemical,
        job_id: newJob.id,
        warehouse_id: item.warehouse,
      });
      if (job.type === "outgoing") {
        await WarehouseItem.query()
          .decrement("amount", item.amount)
          .where("warehouse_id", item.warehouse)
          .andWhere("chemical", item.chemical);
        await Warehouse.query()
          .decrement("current_stock", item.amount)
          .where("id", item.warehouse);
        await Audit.query().insert({
          type: jobType,
          chemical: item.chemical,
          warehouse_id: item.warehouse,
          site_id: siteID,
          amount: item.amount,
        });
      } else {
        let thereIsChemical = await WarehouseItem.query()
          .select("id")
          .where("chemical", item.chemical)
          .andWhere("warehouse_id", item.warehouse);
        if (thereIsChemical[0]) {
          await WarehouseItem.query()
            .increment("amount", item.amount)
            .where("warehouse_id", item.warehouse)
            .andWhere("chemical", item.chemical);
        } else {
          await WarehouseItem.query().insert({
            warehouse_id: item.warehouse,
            chemical: item.chemical,
            amount: item.amount,
          });
          console.log("we are in warehouseitem", WarehouseItem.amount);
        }
        await Warehouse.query()
          .increment("current_stock", item.amount)
          .where("id", item.warehouse);
      }
      console.log("we are in audit");
      await Audit.query().insert({
        type: jobType,
        chemical: item.chemical,
        warehouse_id: item.warehouse,
        site_id: siteID,
        amount: item.amount,
      });
      console.log(jobType);
    });
    return res.send({ response: "success" });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.send({ error: "could not update db" });
    }
  }
});

module.exports = router;
