import React, { useState, useEffect, useRef } from "react";
// import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";
import { Tabs, Tab, Content } from "./TabStyle";
import "../css/search.css";
import Datepicker from "./Datepicker/Datepicker";
import Accordion from "./Accordion";
import * as moment from "moment";
import axios from "axios";

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  const ref = useRef(null);

  const getSiteTotalData = async () => {
    const siteData = await axios.get(`http://localhost/sites`);
    console.log(siteData.data);
    const site1 = {
      A: siteData.data.site1A,
      B: siteData.data.site1B,
      C: siteData.data.site1C,
      alert: siteData.data.site1alert,
    };

    setSite1DataTotal(site1);

    const site2 = {
      A: siteData.data.site2A,
      B: siteData.data.site2B,
      C: siteData.data.site2C,
      alert: siteData.data.site2alert,
    };
    setSite2DataTotal(site2);
    console.log(site1, site2);
    setLoading(false);
  };

  const getListChemicals = async () => {
    setLoading(true);
    const list = await axios.get(`http://localhost/listChemical`);
    console.log(list.data);
    const site1FullData = [];
    const site2FullData = [];
    list.data.forEach((element) => {
      if (element.warehouse > 5) {
        site2FullData.push(element);
      } else {
        site1FullData.push(element);
      }
    });
    console.log(site2FullData, site1FullData);
    setSite1DetailedData(site1FullData);
    setSite2DetailedData(site2FullData);
    setLoading(false);
  };

  const getData = () => {
    getSiteTotalData();
    getListChemicals();
  };

  const [site1DataTotal, setSite1DataTotal] = useState();

  const [site2DataTotal, setSite2DataTotal] = useState();

  const [site1DetailedData, setSite1DetailedData] = useState();
  const [site2DetailedData, setSite2DetailedData] = useState();

  const renderTableHeader = (data) => {
    let header = Object.keys(data[0]);
    return header.map((key, index) => {
      return (
        <p key={index} className="tabel-header">
          {key.toUpperCase()}
        </p>
      );
    });
  };

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

  const [object, setObject] = useState();

  function handleSearchDates(value) {
    console.log(value);
    const searchOb = {
      endDate: value.endDate,
      startDate: value.startDate,
    };
    setSearchDates(searchOb);

    console.log(searchDates);
  }

  const clearFilters = async () => {
    window.location.reload(false);
    ref.current.cleanValue();
  };

  useEffect(() => {
    if (searchDates == null) {
      getData();
    }

    console.log(searchDates);
    if (searchDates && searchDates.endDate) {
      console.log(searchDates);
      let filteredDates = site1DetailedData.filter((item) => {
        let date = moment.utc(item.date)._d;
        console.log(date);
        console.log(searchDates.startDate);
        if (
          moment(date).isBetween(
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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="total-container">
              <h2> Total</h2>
              <p>
                A: {site1DataTotal.A} B: {site1DataTotal.B} C:{" "}
                {site1DataTotal.C} Alert: {site1DataTotal.alert}{" "}
              </p>

              <button onClick={sortByWarehouse}>Sort by warehouse</button>
              <button onClick={sortByDate}>Sort by date</button>

              <div>
                <Accordion title="Search by date">
                  <Datepicker
                    value={searchDates}
                    parentFunction={handleSearchDates}
                    // ref={ref}
                  />
                </Accordion>
              </div>

              {site1DetailedData && site1DetailedData.length ? (
                <div>
                  <div>
                    {" "}
                    {renderTableHeader(site1DetailedData)}
                    {site1DetailedData.map((data, i) => (
                      <div className="table-rows" key={i}>
                        <p className="tabel-item"> {data.chemical}</p>
                        <p className="tabel-item"> {data.action}</p>
                        <p className="tabel-item"> {data.date}</p>
                        <p className="tabel-item"> {data.warehouse}</p>
                        <p className="tabel-item"> {data.ticket}</p>
                      </div>
                    ))}
                    {/* }); */}
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
        </Content>
        <Content active={active === 1}>
          <h1>Content 2</h1>
        </Content>
      </>
    </div>
  );
}
