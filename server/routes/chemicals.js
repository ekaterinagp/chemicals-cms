const router = require("express").Router();

// const Warehouse = require("../models/Warehouse");
// const WarehouseItem = require("../models/WarehouseItem");
const Job = require("../models/Job");
const JobItem = require("../models/JobItem");

//{
//   A: 300,
//   B: 78,
//   C: 201,
//   desc: "total",
//   total: 579,
// }
// and the same today, week, month
// and delivered and dispatched

router.get("/totaldelivery", async (req, res) => {
  const jobs = await Job.query().withGraphFetched("jobitem").where("type", "I");

  const allDelivery = {
    A: null,
    B: null,
    C: null,
    desc: "total",
    total: null,
  };
  jobs.forEach((job) => {
    // console.log(job.jobitem);
    if (job.jobitem.chemical == "A") {
      allDelivery.A = allDelivery.A + job.jobitem.amount;
    }
    if (job.jobitem.chemical == "B") {
      allDelivery.B = allDelivery.B + job.jobitem.amount;
    }
    if (job.jobitem.chemical == "C") {
      allDelivery.C = allDelivery.C + job.jobitem.amount;
    }
    allDelivery.total = allDelivery.total + job.jobitem.amount;
  });
  return res.send(allDelivery);
});

module.exports = router;
