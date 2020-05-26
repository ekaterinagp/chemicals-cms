import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/statistic.css";
import Paginator from "react-hooks-paginator";

export default function Statistic() {
  const [audit, setAudit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const pageLimit = 10;
  const [initialState, setInitialState] = useState([]);

  const getAuditData = async () => {
    const list = await axios.get(`http://localhost/audit`);
    console.log(list.data);
    setAudit(list.data);
    setInitialState(list.data);
    console.log(initialState);
    console.log(audit);
    setLoading(false);
  };

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
  const sortByDate = () => {
    setAudit();
    const sortedByDate = [...audit].sort((a, b) => {
      let dateA = new Date(a.date),
        dateB = new Date(b.date);

      return dateA - dateB;
    });
    setAudit(sortedByDate);
  };

  const getOnlyDelivered = () => {
    console.log(initialState);
    console.log({ audit });
    setAudit(initialState);

    const delivered = audit.filter((one) => {
      return one.type == "delivered";
    });

    console.log(delivered);

    setAudit(delivered);
  };

  const handelClick = () => {
    console.log({ audit });
    setAudit(initialState);

    getOnlyDispatched();
  };

  const getOnlyDispatched = () => {
    console.log("in disp");

    console.log({ audit });
    const dispatched = audit.filter((one) => {
      return one.type == "dispatched";
    });

    console.log(dispatched);

    setAudit(dispatched);
  };

  const showAll = () => {
    getAuditData();
  };

  useEffect(() => {
    getAuditData();
  }, []);

  useEffect(() => {}, [audit]);

  useEffect(() => {
    if (audit.length) {
      setCurrentData(audit.slice(offset, offset + pageLimit));
    }
  }, [offset, audit]);

  return (
    <>
      <div>
        <h1> This is statistics page</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="div-stat">
            <button onClick={showAll}>Show All</button>
            <button onClick={sortByDate}>Sort by date</button>
            <button onClick={getOnlyDelivered}>Only delivered</button>
            <button onClick={handelClick}>Only dispatched</button>
            <div>
              <Paginator
                totalRecords={audit.length}
                pageLimit={12}
                pageNeighbours={1}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
            {renderTableHeader(audit)}

            <div className="stat">
              {currentData.map((data, i) => (
                <div className="table-rows" key={i}>
                  <p className="tabel-item"> {data.type}</p>
                  <p className="tabel-item"> {data.chemical}</p>
                  <p className="tabel-item"> {data.amount}</p>
                  <p className="tabel-item"> {data.warehouse}</p>
                  <p className="tabel-item"> {data.site}</p>
                  <p className="tabel-item"> {data.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
