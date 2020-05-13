import React, { useState, useEffect, useRef } from "react";
// import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";
import { Tabs, Tab, Content } from "./TabStyle";
import "../css/search.css";
import Datepicker from "./Datepicker/Datepicker";

import * as moment from "moment";

export default function Search() {
  const [active, setActive] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  const myref = useRef(null);

  const [site1DataTotal, setSite1DataTotal] = useState({
    A: 25,
    B: 15,
    C: 12,
    alert: 0,
  });

  const [site1DetailedData, setSite1DetailedData] = useState([
    { chemical: "A", action: "delivered", date: "12-05-2020", warehouse: 1 },
    { chemical: "C", action: "dispatched", date: "04-05-2020", warehouse: 1 },
    { chemical: "B", action: "delivered", date: "07-05-2020", warehouse: 5 },
    { chemical: "B", action: "delivered", date: "08-05-2020", warehouse: 2 },
    { chemical: "A", action: "dispatched", date: "05-05-2020", warehouse: 3 },
    { chemical: "C", action: "delivered", date: "13-05-2020", warehouse: 1 },
  ]);
  // console.log(site1DataTotal);

  let detailedData = site1DetailedData.map((data, i) => {
    return (
      <tr key={i}>
        <td> {data.chemical}</td>
        <td> {data.action}</td>
        <td> {data.date}</td>
        <td> {data.warehouse}</td>
      </tr>
    );
  });

  const sortByWarehouse = () => {
    // console.log(site1DetailedData[0].date);
    const sortedByWarehouse = [...site1DetailedData].sort((a, b) => {
      return a.warehouse - b.warehouse;
    });
    setSite1DetailedData(sortedByWarehouse);
  };

  const sortByDate = () => {
    const sortedByDate = [...site1DetailedData].sort((a, b) => {
      let dateA = new Date(a.date),
        dateB = new Date(b.date);

      return dateA - dateB;
    });
    setSite1DetailedData(sortedByDate);
  };

  const [searchDates, setSearchDates] = useState();

  function handleSearchDates(value) {
    console.log(value);
    setSearchDates(value);
    console.log(searchDates);
  }

  const clearFilters = () => {
    setSite1DetailedData([
      { chemical: "A", action: "delivered", date: "12-05-2020", warehouse: 1 },
      { chemical: "C", action: "dispatched", date: "04-05-2020", warehouse: 1 },
      { chemical: "B", action: "delivered", date: "07-05-2020", warehouse: 5 },
      { chemical: "B", action: "delivered", date: "08-05-2020", warehouse: 2 },
      { chemical: "A", action: "dispatched", date: "05-05-2020", warehouse: 3 },
      { chemical: "C", action: "delivered", date: "13-05-2020", warehouse: 1 },
    ]);
    myref.current.cleanValue();
  };
  useEffect(() => {
    console.log(searchDates);
    if (searchDates && searchDates.endDate) {
      console.log(searchDates);
      let filteredDates = site1DetailedData.filter((item) => {
        if (
          moment(item.date, "DD-MM-YYYY").isBetween(
            moment(searchDates.startDate),
            moment(searchDates.endDate),
            null,
            "[]"
          )
        ) {
          return true;
        } else {
          return false;
        }
      });
      console.log(filteredDates);
      setSite1DetailedData(filteredDates);
    }
  }, [searchDates]);

  //

  return (
    <div>
      <h1>This is search page </h1>
      <button onClick={clearFilters}>Clear all filters</button>
      <Tabs>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          Site 1
        </Tab>

        <Tab onClick={handleClick} active={active === 1} id={1}>
          Site 2
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          <h1>Site 1</h1>
          <div className="total-container">
            <h2> Total</h2>
            <p>
              A: {site1DataTotal.A} B: {site1DataTotal.B} C: {site1DataTotal.C}{" "}
              Alert: {site1DataTotal.alert}{" "}
            </p>
            <tabel>
              <button onClick={sortByWarehouse}>Sort by warehouse</button>
              <button onClick={sortByDate}>Sort by date</button>
              <div>
                <Datepicker
                  value={searchDates}
                  onChange={handleSearchDates}
                  ref={myref}
                />
              </div>

              <tr>
                <th>Chemical</th>
                <th>Action</th>
                <th>Date</th>
                <th>Warehouse #</th>
              </tr>
              {detailedData}
            </tabel>
          </div>
        </Content>
        <Content active={active === 1}>
          <h1>Content 2</h1>
        </Content>
      </>
    </div>
  );
}
