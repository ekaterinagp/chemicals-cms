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
  const [indexN, setIndexN] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    setIndexN(index);
    console.log({ indexN });
    if (index !== active) {
      setActive(index);
      console.log(active);
    }
  };

  const ref = useRef(null);

  const getSiteTotalData = async () => {
    const siteData = await axios.get(`http://localhost/sites`);
    console.log(siteData.data);
    const site1 = {
      A: siteData.data.site1A !== null ? siteData.data.site1A : "0",
      B: siteData.data.site1B !== null ? siteData.data.site1B : "0",
      C: siteData.data.site1C !== null ? siteData.data.site1C : "0",
      alert: siteData.data.site1alert !== null ? siteData.data.site1alert : "0",
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

  const sortByWarehouse1 = () => {
    // console.log(site1DetailedData[0].date);
    const sortedByWarehouse = [...site1DetailedData].sort((a, b) => {
      return a.warehouse - b.warehouse;
    });
    setSite1DetailedData(sortedByWarehouse);
  };

  const sortByWarehouse2 = () => {
    // console.log(site1DetailedData[0].date);
    const sortedByWarehouse = [...site2DetailedData].sort((a, b) => {
      return a.warehouse - b.warehouse;
    });
    setSite2DetailedData(sortedByWarehouse);
  };

  const sortByDate1 = () => {
    const sortedByDate = [...site1DetailedData].sort((a, b) => {
      let dateA = new Date(a.date),
        dateB = new Date(b.date);

      return dateA - dateB;
    });
    setSite1DetailedData(sortedByDate);
  };

  const sortByDate2 = () => {
    const sortedByDate = [...site2DetailedData].sort((a, b) => {
      let dateA = new Date(a.date),
        dateB = new Date(b.date);

      return dateA - dateB;
    });
    setSite2DetailedData(sortedByDate);
  };

  const [searchDates, setSearchDates] = useState();

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
    setSearchDates(null);
    ref.current.cleanValue();
  };

  useEffect(() => {
    if (searchDates == null) {
      getData();
    }
    console.log({ indexN });
    if (active === 1) {
      if (searchDates && searchDates.endDate) {
        // console.log(searchDates);
        let filteredDates = site2DetailedData.filter((item) => {
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
        setSite2DetailedData(filteredDates);
      }
    } else {
      if (searchDates && searchDates.endDate) {
        // console.log(searchDates);
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
    }
    // console.log(searchDates1);
  }, [searchDates]);

  //

  return (
    <div>
      <h1 className="title">Sites overview</h1>

      <Tabs>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          <h3 className="site-name">Site 1</h3>
        </Tab>

        <Tab onClick={handleClick} active={active === 1} id={1}>
          <h3 className="site-name">Site 2</h3>
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          {/* <h1>Site 1</h1> */}
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <div className="total-container">
              <p className="total-desc1">
                <strong>In total:</strong> <strong>A:</strong>{" "}
                {site1DataTotal.A} <strong>B:</strong> {site1DataTotal.B}{" "}
                <strong>C:</strong> {site1DataTotal.C} <strong>Alert:</strong>
                {site1DataTotal.alert}{" "}
              </p>
              <div className="button-container">
                <button onClick={sortByWarehouse1}>Sort by warehouse</button>
                <button onClick={sortByDate1}>Sort by date</button>
                <button className="clearFilters" onClick={clearFilters}>
                  Clear all filters
                </button>
              </div>
              <div className="div-accordion">
                <Accordion title="Search by date">
                  <Datepicker
                    value={searchDates}
                    parentFunction={handleSearchDates}
                    ref={ref}
                  />
                </Accordion>
              </div>

              {site1DetailedData && site1DetailedData.length ? (
                <div>
                  <div className="grid-list">
                    {" "}
                    <div className="tabelHeader">
                      {renderTableHeader(site1DetailedData)}
                    </div>
                    {site1DetailedData.map((data, i) => (
                      <div className="table-rows" key={i}>
                        <p className="tabel-item"> {data.chemical}</p>
                        <p className="tabel-item"> {data.action}</p>
                        <p className="tabel-item"> {data.date}</p>
                        <p className="tabel-item"> {data.warehouse}</p>
                        <p className="tabel-item"> {data.ticket}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="loading">Loading...</p>
              )}
            </div>
          )}
        </Content>
        <Content active={active === 1}>
          {/* <h1>Content 2</h1> */}
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <div className="total-container">
              <p className="total-desc">
                <strong>In total:</strong> <strong>A:</strong>
                {site2DataTotal.A}
                <strong> B: </strong> {site2DataTotal.B} <strong> C: </strong>{" "}
                {site2DataTotal.C} <strong>Alert: </strong>{" "}
                {site2DataTotal.alert}{" "}
              </p>
              <div className="button-container">
                <button onClick={sortByWarehouse2}>Sort by warehouse</button>
                <button onClick={sortByDate2}>Sort by date</button>
                <button className="clearFilters" onClick={clearFilters}>
                  Clear all filters
                </button>
              </div>
              <div className="div-accordion">
                <Accordion title="Search by date">
                  <Datepicker
                    value={searchDates}
                    parentFunction={handleSearchDates}
                    ref={ref}
                  />
                </Accordion>
              </div>

              {site2DetailedData && site2DetailedData.length ? (
                <div>
                  <div className="grid-list">
                    {" "}
                    <div className="tabelHeader">
                      {renderTableHeader(site2DetailedData)}
                    </div>
                    {site2DetailedData.map((data, i) => (
                      <div className="table-rows" key={i}>
                        <p className="tabel-item"> {data.chemical}</p>
                        <p className="tabel-item"> {data.action}</p>
                        <p className="tabel-item"> {data.date}</p>
                        <p className="tabel-item"> {data.warehouse}</p>
                        <p className="tabel-item"> {data.ticket}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="loading">Loading...</p>
              )}
            </div>
          )}
        </Content>
      </>
    </div>
  );
}
