const Site = require("./site");
const Warehouse = require("./warehouse");
const Ticket = require("./ticket");
// const Job = require('./job')

const axios = require("axios");
// 10, 12, 5, 3, 9

let site1 = new Site(1);
let site2 = new Site(2);

let ticket1 = new Ticket("incoming", { A: 1, C: 2 });
let ticket2 = new Ticket("incoming", { A: 7, C: 3 });
let ticket3 = new Ticket("incoming", { C: 7 });
let ticket4 = new Ticket("outgoing", { C: 4 });
let ticket5 = new Ticket("outgoing", { A: 2 });
let ticket6 = new Ticket("incoming", { A: 5, C: 7 });
let ticket7 = new Ticket("incoming", { B: 6, C: 1 });
let ticket8 = new Ticket("incoming", { B: 5 });

let aWarehouses = [];
let aWarehouses1 = [];

const fetchWarehouses = async () => {
  const response = await axios("http://localhost/warehouses");
  const warehouses = await response.data;
  console.log({ warehouses });
  warehouses.forEach((warehouse) => {
    if (warehouse.id <= 5) {
      aWarehouses.push(new Warehouse(warehouse.id, warehouse.capacity));
    } else {
      aWarehouses1.push(new Warehouse(warehouse.id, warehouse.capacity));
    }
  });
  site1.warehouses = aWarehouses;
  site2.warehouses = aWarehouses1;
};

const assignWarehouses = async () => {
  console.log("assign warehouses");
  await fetchWarehouses();
  // fill warehouses with chemicals
  for await (let warehouse of site1.warehouses) {
    warehouse.chemicalInventory = await fetchWarehouseStock(warehouse.id);
  }
  for await (let warehouse of site2.warehouses) {
    warehouse.chemicalInventory = await fetchWarehouseStock(warehouse.id);
  }
  console.log(site1, site2);
};

// console.log(ticket2)

const fetchWarehouseStock = async (id) => {
  const response = await axios(`http://localhost/currentstock/${id}`);
  const warehouseStock = await response.data;
  console.log(warehouseStock);
  let stockObj = {};
  warehouseStock.map((stock) => {
    let temp = {};
    temp[stock.chemical] = stock.amount;
    stockObj = { ...temp, ...stockObj };
    return temp;
  });
  //    console.log(stockObj)
  return stockObj;
};

const sendJobToWarehouses = (site, job) => {
  let isWarehouseAvailable = [];
  console.log(job);
  job.placementArray.map((placement) => {
    site.warehouses.find((warehouse) => {
      console.log(placement.warehouse, warehouse.id);
      if (warehouse.id === placement.warehouse) {
        console.log("bla", warehouse.checkIfSpaceForChemicals(job));
        isWarehouseAvailable.push(warehouse.checkIfSpaceForChemicals(job));
      }
    });
  });
  return isWarehouseAvailable;
};

/* first I need to fetch warehouse to save into the site classes
then I need to fill those warehouses with inventory
then I need to make a ticket
    process ticket
    if it is approved, it becomes a job
    then I have to revert the warehouses to original state from fetching
    */

const createData = async (site, ticket) => {
  await assignWarehouses();

  let job = site.processTicket(ticket);

  console.log(site.warehouses);
  console.log(job);
  console.log({ ticket });
  console.log(ticket.status);

  if (job.status === "inProcess") {
    for await (let warehouse of site.warehouses) {
      warehouse.chemicalInventory = await fetchWarehouseStock(warehouse.id);
    }
    console.log("originial state", site.warehouses);

    let isWarehouseAvailable = sendJobToWarehouses(site, job);
    console.log("warhhoues available:", isWarehouseAvailable);
    if (!isWarehouseAvailable.includes(false)) {
      console.log("true");
      console.log(job);
      //     //  TODO: send job to db, and update warehouses
      const response = await axios.post(`http://localhost/processJob`, job);
      console.log(response);
      console.log("yes");
    } else {
      console.log("job denied");
    }
  } else {
    return false;
  }
};

// ###########--> RUN THESE ONE AT A TIME TO FILL DB <--#############

// createData(site2, ticket5);
// createData(site2, ticket2);
// createData(site2, ticket3);
// createData(site2, ticket4);
// createData(site2, ticket6);
// createData(site2, ticket1);
// createData(site1, ticket1);
createData(site1, ticket2);
// createData(site1, ticket3);
// createData(site1, ticket4);
// createData(site1, ticket5);
// createData(site1, ticket6);
// createData(site2, ticket7);
// createData(site2, ticket8);
