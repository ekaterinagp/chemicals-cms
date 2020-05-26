import React, { useState, useEffect } from "react";
import "../../css/header.css";
import moment from "moment";

export default function Header() {
  let time = new Date().toLocaleString();
  // let day = moment(new Date()).format("DD/MM/YYYY");

  const [user, setUser] = useState({
    name: "Admin",
  });

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <>
      <div className="main-header">
        <div className="hello">
          {" "}
          <p> Hello {user.name}</p>
          <p className="currentTime">
            {/* {day} */}
            {time}
          </p>
        </div>
        <h1>Toxic Chemical Industrie A/S</h1>
      </div>
    </>
  );
}
