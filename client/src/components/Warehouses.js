import React, { useState, useEffect } from "react";
import "../css/warehouse.css";
import axios from "axios";

import ChartWarehouse from "./charts/ChartWarehouse";

// (1st-10ku, 2nd-12ku, 3rd-5ku, 4th-3ku, 5th-9ku)

export default function Warehouses() {
  const [isLoading, setLoading] = useState(true);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
  const [data5, setData5] = useState(null);
  const [data6, setData6] = useState(null);
  const [data7, setData7] = useState(null);
  const [data8, setData8] = useState(null);
  const [data9, setData9] = useState(null);
  const [data10, setData10] = useState(null);

  const getDataByWarehouse = async () => {
    const stock1 = await axios.get(`http://localhost/details/${1}`);
    const stock2 = await axios.get(`http://localhost/details/${2}`);
    const stock3 = await axios.get(`http://localhost/details/${3}`);
    const stock4 = await axios.get(`http://localhost/details/${4}`);
    const stock5 = await axios.get(`http://localhost/details/${5}`);
    const stock6 = await axios.get(`http://localhost/details/${6}`);
    const stock7 = await axios.get(`http://localhost/details/${7}`);
    const stock8 = await axios.get(`http://localhost/details/${8}`);
    const stock9 = await axios.get(`http://localhost/details/${9}`);
    const stock10 = await axios.get(`http://localhost/details/${10}`);
    console.log(stock1.data, stock2.data, stock3.data);
    console.log(Object.values(stock1.data));
    const data1 = checkForNull(stock1.data);
    const data2 = checkForNull(stock2.data);
    const data3 = checkForNull(stock3.data);
    const data4 = checkForNull(stock4.data);
    const data5 = checkForNull(stock5.data);
    const data6 = checkForNull(stock6.data);
    const data7 = checkForNull(stock7.data);
    const data8 = checkForNull(stock8.data);
    const data9 = checkForNull(stock9.data);
    const data10 = checkForNull(stock10.data);
    console.log(data1);
    setData1(data1);
    setData2(data2);
    setData3(data3);
    setData4(data4);
    setData5(data5);
    setData6(data6);
    setData7(data7);
    setData8(data8);
    setData9(data9);
    setData10(data10);
    setLoading(false);
    console.log(data10);
  };

  const checkForNull = (object) => {
    if (object == null) {
      return null;
    } else {
      if (object.A == null) {
        delete object.A;
      }
      if (object.B == null) {
        delete object.B;
      }

      if (object.C == null) {
        delete object.C;
      }
      console.log(object);
      return object;
    }
  };

  useEffect(() => {
    getDataByWarehouse();
    if (data1 !== {}) {
      console.log("not null!");
      console.log(data1);
    }
  }, []);

  {
    /* {isLoading ? <p>Loading...</p> :(

      )} */
  }

  return (
    <>
      <h1 className="title"> Current stock </h1>
      <div className="superWrapper">
        <div className="site-wrapper box">
          <h2 className="title1">Site 1</h2>
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : (
            <div className="warehouse-container">
              <div className="canvas-container">
                <ChartWarehouse {...data1} />
              </div>
              <div className="canvas-container">
                <ChartWarehouse {...data2} />
              </div>
              <div className="canvas-container">
                <ChartWarehouse {...data3} />
              </div>
              <div className="canvas-container">
                <ChartWarehouse {...data4} />
              </div>
              <div className="canvas-container">
                <ChartWarehouse {...data5} />
              </div>
            </div>
          )}
        </div>
        <div className="site-wrapper2 box">
          <h2 className="title1">Site 2</h2>
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : (
            <div className="warehouse-container">
              <div className="canvas-container">
                <ChartWarehouse {...data6} />
              </div>
              <div className="canvas-container">
                <ChartWarehouse {...data7} />
              </div>
              <div className="canvas-container">
                <ChartWarehouse {...data8} />
              </div>
              <div className="canvas-container">
                <ChartWarehouse {...data9} />
              </div>
              {data10.warehouse === null ? (
                <p>Empty warehouse</p>
              ) : (
                <div className="canvas-container">
                  <ChartWarehouse {...data10} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
