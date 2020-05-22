import React, { useState, useEffect } from "react";
import ChartJobs from "./charts/ChartJobs";
import "../css/startPage.css";
import axios from "axios";

export default function StartPage() {
  const [selectLabels, setselectLabels] = useState([
    { label: "last week", value: "week" },
    { label: "last month", value: "month" },
  ]);

  //rewrite into component
  const [alerts, setAlerts] = useState({
    alerts: [
      {
        reason: "More than 15 A",
        warehouse: "2",
      },
    ],
  });

  const getJobs = async () => {
    const jobs = await axios.get(`http://localhost/jobs`);
    console.log(jobs.data.response);

    let allJobs = jobs.data.response;
    convertData(allJobs);
  };

  const convertData = (allJobs) => {
    let convertedArray = allJobs.map(function (job) {
      job.date = job.date.substring(0, job.date.length - 9);
      return job;
    });
    console.log(convertedArray);

    let permittedValues = convertedArray.map((job) => job.date);
    console.log(permittedValues);
    let counts = {};
    permittedValues.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
      console.log(x);
    });
    console.log(counts);
    const result = [];

    for (let [key, value] of Object.entries(counts)) {
      result.push({ t: key, y: value });
    }
    // const datesTochart = result.sort(t);
    // console.log(datesTochart);

    sortByKey(result, "t");

    console.log({ result });

    setJobDone({
      dates: result,
    });
  };

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  useEffect(() => {
    getJobs();
  }, []);

  //by default last 6 days are shown, on select can change to a month
  const [jobsDone, setJobDone] = useState({
    dates: [
      {
        t: new Date("2020-5-01"),
        y: 3,
      },
      {
        t: new Date("2020-5-03"),
        y: 6,
      },

      {
        t: new Date("2020-5-05"),
        y: 12,
      },

      {
        t: new Date("2020-5-06"),
        y: 2,
      },

      {
        t: new Date("2020-5-07 13:3"),
        y: 10,
      },
      {
        t: new Date("2020-5-08 13:3"),
        y: 6,
      },
    ],
  });

  const getAlerts = alerts.alerts.map((alert, i) => (
    <div className="notification" key={i}>
      <p className="notify"> </p>
      {alert.reason} at warehouse #{alert.warehouse}
    </div>
  ));

  const getValue = (selectValue) => {
    console.log(selectValue);
    if (selectValue == "month") {
      setJobDone({
        dates: [
          {
            t: new Date("2020-5-01"),
            y: 3,
          },
          {
            t: new Date("2020-5-03"),
            y: 6,
          },

          {
            t: new Date("2020-5-05"),
            y: 12,
          },

          {
            t: new Date("2020-5-06"),
            y: 2,
          },

          {
            t: new Date("2020-5-07 13:3"),
            y: 10,
          },
          {
            t: new Date("2020-5-08 13:3"),
            y: 6,
          },
          {
            t: new Date("2020-5-11"),
            y: 3,
          },
          {
            t: new Date("2020-5-12"),
            y: 6,
          },

          {
            t: new Date("2020-5-14"),
            y: 32,
          },

          {
            t: new Date("2020-5-17"),
            y: 2,
          },

          {
            t: new Date("2020-5-19"),
            y: 23,
          },
          {
            t: new Date("2020-5-21"),
            y: 1,
          },

          {
            t: new Date("2020-5-23"),
            y: 6,
          },

          {
            t: new Date("2020-5-24"),
            y: 32,
          },

          {
            t: new Date("2020-5-25"),
            y: 2,
          },

          {
            t: new Date("2020-5-27"),
            y: 23,
          },
          {
            t: new Date("2020-5-31"),
            y: 1,
          },
        ],
      });
    } else {
      setJobDone({
        dates: [
          {
            t: new Date("2020-5-01"),
            y: 3,
          },
          {
            t: new Date("2020-5-03"),
            y: 6,
          },

          {
            t: new Date("2020-5-05"),
            y: 12,
          },

          {
            t: new Date("2020-5-06"),
            y: 2,
          },

          {
            t: new Date("2020-5-07 13:3"),
            y: 10,
          },
          {
            t: new Date("2020-5-08 13:3"),
            y: 6,
          },
          {
            t: new Date("2020-5-11"),
            y: 3,
          },
        ],
      });
    }
  };

  return (
    <>
      <div>
        <h1> This is start page</h1>
        <div className="container-start-page">
          <div className="alerts box">
            active alerts
            {getAlerts}
          </div>
          <div className="jobs box">
            <select
              value={selectLabels.value}
              onChange={(e) => getValue(e.currentTarget.value)}
            >
              {selectLabels.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <ChartJobs {...jobsDone} />
          </div>
        </div>
      </div>
    </>
  );
}
