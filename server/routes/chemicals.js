const router = require("express").Router();
const moment = require("moment");

const Job = require("../models/Job");

router.get("/totaldelivery", async (req, res) => {
  const jobs = await Job.query().withGraphFetched("jobitem").where("type", "I");

  const allDelivery = {
    A: 0,
    B: 0,
    C: 0,
    desc: "total",
    total: 0,
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

router.get("/totaldispatch", async (req, res) => {
  const jobs = await Job.query().withGraphFetched("jobitem").where("type", "O");

  const allDispatch = {
    A: 0,
    B: 0,
    C: 0,
    desc: "total",
    total: 0,
  };
  jobs.forEach((job) => {
    // console.log(job.jobitem);
    if (job.jobitem.chemical == "A") {
      allDispatch.A = allDispatch.A + job.jobitem.amount;
    }
    if (job.jobitem.chemical == "B") {
      allDispatch.B = allDispatch.B + job.jobitem.amount;
    }
    if (job.jobitem.chemical == "C") {
      allDispatch.C = allDispatch.C + job.jobitem.amount;
    }
    allDispatch.total = allDispatch.total + job.jobitem.amount;
  });
  return res.send(allDispatch);
});

router.get("/delivery", async (req, res) => {
  const jobs = await Job.query().withGraphFetched("jobitem").where("type", "I");
  sortByKey(jobs, "date");
  const deliveryByType = [];
  const totalDelivery = {
    A: 0,
    B: 0,
    C: 0,
    desc: "total",
    total: 0,
  };
  jobs.forEach((job) => {
    // console.log(job.jobitem);
    if (job.jobitem.chemical == "A") {
      totalDelivery.A = totalDelivery.A + job.jobitem.amount;
    }
    if (job.jobitem.chemical == "B") {
      totalDelivery.B = totalDelivery.B + job.jobitem.amount;
    }
    if (job.jobitem.chemical == "C") {
      totalDelivery.C = totalDelivery.C + job.jobitem.amount;
    }
    totalDelivery.total = totalDelivery.total + job.jobitem.amount;
  });
  deliveryByType.push(totalDelivery);

  const todayDelivery = {
    A: 0,
    B: 0,
    C: 0,
    desc: "today",
    total: 0,
  };
  let todayDate = getDate();

  jobs.forEach((job) => {
    if (todayDate == job.date.substring(0, job.date.length - 9)) {
      if (job.jobitem.chemical == "A") {
        todayDelivery.A = todayDelivery.A + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "B") {
        todayDelivery.B = todayDelivery.B + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "C") {
        todayDelivery.C = todayDelivery.C + job.jobitem.amount;
      }
      todayDelivery.total = todayDelivery.total + job.jobitem.amount;
    }
  });
  deliveryByType.push(todayDelivery);

  const weekDelivery = {
    A: 0,
    B: 0,
    C: 0,
    desc: "week",
    total: 0,
  };

  // let dateTo = moment().format("YYYY-MM-DD");
  let dateFrom = moment().subtract(7, "d").format("YYYY-MM-DD");

  jobs.forEach((job) => {
    if (job.date.substring(0, job.date.length - 9) > dateFrom) {
      if (job.jobitem.chemical == "A") {
        weekDelivery.A = weekDelivery.A + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "B") {
        weekDelivery.B = weekDelivery.B + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "C") {
        weekDelivery.C = weekDelivery.C + job.jobitem.amount;
      }
      weekDelivery.total = weekDelivery.total + job.jobitem.amount;
    }
  });

  deliveryByType.push(weekDelivery);

  const monthDelivery = {
    A: 0,
    B: 0,
    C: 0,
    desc: "month",
    total: 0,
  };
  let month = getMonth();

  jobs.forEach((job) => {
    if (month == job.date.charAt(5) + job.date.charAt(6)) {
      if (job.jobitem.chemical == "A") {
        monthDelivery.A = monthDelivery.A + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "B") {
        monthDelivery.B = monthDelivery.B + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "C") {
        monthDelivery.C = monthDelivery.C + job.jobitem.amount;
      }
      monthDelivery.total = monthDelivery.total + job.jobitem.amount;
    }
  });
  deliveryByType.push(monthDelivery);

  return res.send(deliveryByType);
});

router.get("/dispatch", async (req, res) => {
  const jobs = await Job.query().withGraphFetched("jobitem").where("type", "O");
  sortByKey(jobs, "date");
  const dispatchedByType = [];
  const totalDispatch = {
    A: 0,
    B: 0,
    C: 0,
    desc: "total",
    total: 0,
  };
  jobs.forEach((job) => {
    // console.log(job.jobitem);
    if (job.jobitem.chemical == "A") {
      totalDispatch.A = totalDispatch.A + job.jobitem.amount;
    }
    if (job.jobitem.chemical == "B") {
      totalDispatch.B = totalDispatch.B + job.jobitem.amount;
    }
    if (job.jobitem.chemical == "C") {
      totalDispatch.C = totalDispatch.C + job.jobitem.amount;
    }
    totalDispatch.total = totalDispatch.total + job.jobitem.amount;
  });
  dispatchedByType.push(totalDispatch);

  const todayDispatch = {
    A: 0,
    B: 0,
    C: 0,
    desc: "today",
    total: 0,
  };
  let todayDate = getDate();

  jobs.forEach((job) => {
    if (todayDate == job.date.substring(0, job.date.length - 9)) {
      if (job.jobitem.chemical == "A") {
        todayDispatch.A = todayDispatch.A + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "B") {
        todayDispatch.B = todayDispatch.B + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "C") {
        todayDispatch.C = todayDispatch.C + job.jobitem.amount;
      }
      todayDispatch.total = todayDispatch.total + job.jobitem.amount;
    }
  });
  dispatchedByType.push(todayDispatch);

  const weekDispatch = {
    A: 0,
    B: 0,
    C: 0,
    desc: "week",
    total: 0,
  };

  // let dateTo = moment().format("YYYY-MM-DD");
  let dateFrom = moment().subtract(7, "d").format("YYYY-MM-DD");

  jobs.forEach((job) => {
    if (job.date.substring(0, job.date.length - 9) > dateFrom) {
      if (job.jobitem.chemical == "A") {
        weekDispatch.A = weekDispatch.A + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "B") {
        weekDispatch.B = weekDispatch.B + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "C") {
        weekDispatch.C = weekDispatch.C + job.jobitem.amount;
      }
      weekDispatch.total = weekDispatch.total + job.jobitem.amount;
    }
  });

  dispatchedByType.push(weekDispatch);

  const monthDispatch = {
    A: 0,
    B: 0,
    C: 0,
    desc: "month",
    total: 0,
  };
  let month = getMonth();

  jobs.forEach((job) => {
    if (month == job.date.charAt(5) + job.date.charAt(6)) {
      if (job.jobitem.chemical == "A") {
        monthDispatch.A = monthDispatch.A + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "B") {
        monthDispatch.B = monthDispatch.B + job.jobitem.amount;
      }
      if (job.jobitem.chemical == "C") {
        monthDispatch.C = monthDispatch.C + job.jobitem.amount;
      }
      monthDispatch.total = monthDispatch.total + job.jobitem.amount;
    }
  });
  dispatchedByType.push(monthDispatch);

  return res.send(dispatchedByType);
});

function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

function getDate() {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  return year + "-" + month + "-" + date;
}

function getMonth() {
  let date_ob = new Date();
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  return month;
}

module.exports = router;
