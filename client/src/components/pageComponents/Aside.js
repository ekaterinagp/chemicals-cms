import React, { useState } from "react";
import "../../css/aside.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Chemicals from "../Chemicals";
import StartPage from "../StartPage";
import Warehouses from "../Warehouses";
import Statistic from "../Statistic";
import Search from "../Search";

export default function Aside() {
  return (
    <Router basename={"/"}>
      <div className="container">
        <nav className="aside">
          <ul>
            <li>
              <NavLink to="/" exact={true} activeClassName="active">
                Start page
              </NavLink>
            </li>
            <li>
              <NavLink to="/chemicals" activeClassName="active">
                Chemicals
              </NavLink>
            </li>
            <li>
              <NavLink to="/warehouses" activeClassName="active">
                Warehouses
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" activeClassName="active">
                Sites
              </NavLink>
            </li>
            <li>
              <NavLink to="/statistics" activeClassName="active">
                Audit tables
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Switch>
            <Route path="/chemicals">
              <Chemicals />
            </Route>
            <Route path="/warehouses">
              <Warehouses />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/statistics">
              <Statistic />
            </Route>
            <Route path="/">
              <StartPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
