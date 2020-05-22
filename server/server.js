const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { Model } = require("objection");
const Knex = require("knex");
const knexFile = require("./knexfile.js");

const knex = Knex(knexFile.development);

// Give the knex instance to objection
Model.knex(knex);

const Warehouse = require("./models/Warehouse");
const WarehouseItem = require("./models/WarehouseItem");

// ROUTES
const warehouseRoute = require("./routes/warehouses");
const processJobRoute = require("./routes/processJob");

app.use(warehouseRoute);
app.use(processJobRoute);

const server = app.listen(80, (error) => {
  if (error) {
    console.log("Error running express", error);
  }
  console.log("The server is running on port", server.address().port);
});
