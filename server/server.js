const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors");
// let allowedOrigins = ["http://localhost:3000", "http://ekaterinagp.dk"];
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// app.use("/static", express.static("public"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { Model } = require("objection");
const Knex = require("knex");
const knexFile = require("./knexfile.js");

const knex = Knex(knexFile.development);

Model.knex(knex);

const warehouseRoute = require("./routes/warehouses");
const processJobRoute = require("./routes/processJob");
const jobsRoute = require("./routes/jobs");
const chemicalsRoute = require("./routes/chemicals");

app.use(warehouseRoute);
app.use(processJobRoute);
app.use(jobsRoute);
app.use(chemicalsRoute);

const server = app.listen(80, (error) => {
  if (error) {
    console.log("Error running express", error);
  }
  console.log("The server is running on port", server.address().port);
});
