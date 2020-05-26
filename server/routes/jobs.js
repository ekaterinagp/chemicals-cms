const router = require("express").Router();

const Job = require("../models/Job");
const Audit = require("../models/Audit");
router.get("/jobs", async (req, res) => {
  const jobs = await Job.query();
  return res.status(200).send({ response: jobs });
});

//{array of
//   chemical: "A",
//   action: "delivered",
//   date: "12-05-2020",
//   warehouse: 1,
//   ticket: "12345678",
// },

router.get("/listChemical", async (req, res) => {
  const jobs = await Job.query().withGraphFetched("jobitem");
  const arrayOfJobs = [];
  let jobObject = {
    chemical: null,
    action: null,
    date: null,
    warehouse: null,
    ticket: null,
  };

  jobs.forEach((job) => {
    jobObject = {
      chemical: job.jobitem.chemical,
      action: job.type == "I" ? "delivered" : "dispatched",
      date: job.date.substring(0, job.date.length - 9),
      warehouse: job.jobitem.warehouse_id,
      ticket: job.id,
    };
    arrayOfJobs.push(jobObject);
  });
  return res.send(arrayOfJobs);
});

router.get("/audit", async (req, res) => {
  const audit = await Audit.query();
  const arrayOfItems = [];
  let one = {
    type: null,
    chemical: null,
    amount: null,
    warehouse: null,
    site: null,
    date: null,
  };
  audit.forEach((a) => {
    one = {
      type: a.type == "I" ? "delivered" : "dispatched",
      chemical: a.chemical,
      amount: a.amount,
      warehouse: a.warehouse_id,
      site: a.site_id,
      date: a.date.substring(0, a.date.length - 9),
    };
    arrayOfItems.push(one);
  });

  res.send(arrayOfItems);
});

module.exports = router;
