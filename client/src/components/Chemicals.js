import React, { useState, useEffect } from "react";
import "../css/chemicals.css";
import axios from "axios";
import ChartChemicalsDelivered from "./charts/ChartChemicalsDelivered";
import ChartChemicalsDispatched from "./charts/ChartChemicalsDispatched";

export default function Chemicals() {
  //preparing for fetch
  const [loading, setLoading] = useState(true);
  const [selectLabelsDelivered, setselectLabelsDelivered] = useState([
    { label: "total", value: "total" },
    { label: "today", value: "today" },
    { label: "week", value: "week" },
    { label: "month", value: "month" },
  ]);

  const [selectLabelsDispatched, setSelectLabelsDispatched] = useState([
    { label: "total", value: "total" },
    { label: "today", value: "today" },
    { label: "week", value: "week" },
    { label: "month", value: "month" },
  ]);

  const [deliveryForChart, setDeliveryForChart] = useState();

  const getAllDelivery = async () => {
    const allDelivery = await axios.get(`http://localhost/totaldelivery`);
    console.log(allDelivery.data);
    setDeliveryForChart(allDelivery.data);
    setLoading(false);
  };

  const getDeliveryByType = async () => {
    const deliveryByType = await axios.get(`http://localhost/delivery`);
    console.log(deliveryByType.data);
    setDeliveredByTypes(deliveryByType.data);
    setLoading(false);
  };

  const [dispatchForChart, setDispatchForChart] = useState();
  //   {
  //   A: 300,
  //   B: 78,
  //   C: 201,
  //   desc: "total",
  //   total: 579,
  // }

  const getAllDispatch = async () => {
    const allDispatch = await axios.get(`http://localhost/totaldispatch`);
    console.log(allDispatch.data);
    setDispatchForChart(allDispatch.data);
    setLoading(false);
  };

  const getDispatchByType = async () => {
    const dispatch = await axios.get(`http://localhost/dispatch`);
    console.log(dispatch.data);
    setDispatchedByTypes(dispatch.data);
    setLoading(false);
  };

  const [dispatchedByTypes, setDispatchedByTypes] = useState([
    // { A: 300, B: 78, C: 201, desc: "total", total: 579 },
    // { A: 10, B: 40, C: 6, desc: "today", total: 56 },
    // { A: 80, B: 50, C: 16, desc: "week", total: 146 },
    // { A: 150, B: 150, C: 50, desc: "month", total: 350 },
  ]);

  const [deliveredByTypes, setDeliveredByTypes] = useState([]);

  const getValueForDelivered = (selectedValue) => {
    console.log(selectedValue);

    deliveredByTypes.forEach((deliveredByTypes) => {
      if (selectedValue == deliveredByTypes.desc) {
        console.log({ deliveryForChart });
        console.log(deliveredByTypes);
        setDeliveryForChart({
          A: deliveredByTypes.A,
          B: deliveredByTypes.B,
          C: deliveredByTypes.C,
          desc: deliveredByTypes.desc,
          total: deliveredByTypes.total,
        });
        console.log({ deliveryForChart });
      }
    });
  };

  const getValueForDispatched = (selectedValue) => {
    console.log(selectedValue);
    dispatchedByTypes.forEach((dispatchedByTypes) => {
      if (selectedValue == dispatchedByTypes.desc) {
        setDispatchForChart({
          A: dispatchedByTypes.A,
          B: dispatchedByTypes.B,
          C: dispatchedByTypes.C,
          desc: dispatchedByTypes.desc,
          total: dispatchedByTypes.total,
        });
        console.log({ dispatchForChart });
      }
    });
  };

  useEffect(() => {
    console.log(deliveryForChart);
    getAllDelivery();
    getDeliveryByType();
    getDispatchByType();
    getAllDispatch();
  }, []);

  return (
    <>
      <div>
        {" "}
        <h1> This is chemicals page</h1>
        {loading || deliveryForChart == null ? (
          <p>Loading...</p>
        ) : (
          <div className="chemicals-container">
            <div className="deliver-container">
              <h2>Delivered</h2>
              {deliveredByTypes !== null ? (
                <>
                  <select
                    value={selectLabelsDelivered.value}
                    onChange={(e) =>
                      getValueForDelivered(e.currentTarget.value)
                    }
                  >
                    {selectLabelsDelivered.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <p>Loading</p>
              )}

              {Object.keys(deliveryForChart).length === 0 &&
              deliveryForChart.constructor === Object ? (
                <p>Loading</p>
              ) : (
                <ChartChemicalsDelivered {...deliveryForChart} />
              )}
            </div>
            <div className="dispatch-container">
              <h2>Dispatched</h2>

              <select
                value={selectLabelsDispatched.value}
                onChange={(e) => getValueForDispatched(e.currentTarget.value)}
              >
                {selectLabelsDispatched.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              {Object.keys(dispatchForChart).length === 0 &&
              dispatchForChart.constructor === Object ? (
                <p>Loading</p>
              ) : (
                <ChartChemicalsDispatched {...dispatchForChart} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
