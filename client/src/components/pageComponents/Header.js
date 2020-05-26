import React, { useState, useEffect } from "react";

export default function Header() {
  let day = new Date().toLocaleString();

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
        <h1> Hello {user.name}</h1>
        <p className="currentTime">{day}</p>
      </div>
    </>
  );
}
