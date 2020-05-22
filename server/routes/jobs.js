const router = require("express").Router();

const Job = require("../models/Job");
router.get("/jobs", async (req, res) => {
  const jobs = await Job.query();
  return res.status(200).send({ response: jobs });
});

module.exports = router;
