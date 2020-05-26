const router = require("express").Router();

const Job = require("../models/Job");
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

module.exports = router;
