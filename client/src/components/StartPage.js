import React, { useState, useEffect } from "react";
import ChartJobs from "./charts/ChartJobs";
import "../css/startPage.css";
import axios from "axios";

export default function StartPage() {
  const [selectLabels, setselectLabels] = useState([
    { label: "last week", value: "week" },
    { label: "last month", value: "month" },
  ]);

  const [result, setResult] = useState([]);
  //rewrite into component
  const [totalA, setTotalA] = useState([]);
  const [alerts, setAlerts] = useState();

  const getAlerts = async () => {
    const siteStock = await axios.get(`http://localhost/sites`);
    console.log(siteStock.data);

    siteStock.data.forEach((one) => {
      if (one.totalA > 15) {
        console.log(one);
        setAlerts({
          text: "More than 15 A on a site",
          site: one.site,
        });
      }
    });
    console.log(alerts);
  };

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
    console.log({ convertedArray });

    let permittedValues = convertedArray.map((job) => job.date);
    permittedValues.sort();
    console.log({ permittedValues });

    let randomArray = permittedValues.map((one) => {
      let addNumber = getRandomInt();
      if (addNumber < 10) {
        addNumber = "0" + addNumber;
      }
      one = one.substring(0, one.length - 2) + addNumber;

      return one;
    });
    randomArray.sort();
    console.log({ randomArray });

    let counts = {};
    randomArray.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
      console.log(x);
    });
    console.log(counts);

    for (let [key, value] of Object.entries(counts)) {
      result.push({ t: key, y: value });
    }
    // const datesTochart = result.sort(t);
    // console.log(datesTochart);

    sortByKey(result, "t");

    console.log({ result });
    console.log(result.slice(result.length - 7));
    setResult(result);

    setJobDone({
      dates: result.slice(result.length - 7),
    });
  };

  function getRandomInt() {
    return Math.floor(Math.random() * 31) + 1;
  }

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  useEffect(() => {
    getJobs();
    getAlerts();
    console.log(alerts);
  }, []);

  const [jobsDone, setJobDone] = useState({});
  // const [jobsDoneMonth, setJobDoneMonth] = useState({});

  const getValue = (selectValue) => {
    console.log(selectValue);
    if (selectValue == "month") {
      setJobDone({
        dates: result,
      });
    } else {
      setJobDone({ dates: result.slice(result.length - 7) });
    }
  };

  return (
    <>
      <h1> This is start page</h1>
      <div className="container-start-page">
        <div className="alerts box">
          <h3> active alerts </h3>
          {console.log(alerts)}
          {alerts ? (
            <div className="notification">
              <p className="notify"> </p>
              There are more than 15 A at site #{alerts.site}
            </div>
          ) : (
            <div>There are no active alerts</div>
          )}
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
    </>
  );
}
