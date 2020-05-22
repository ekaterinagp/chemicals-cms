// create site class containing array of warehouses
const Job = require("./job");

class Site {
  constructor(id, warehouses) {
    this.id = id;
    this.warehouses = warehouses;
  }

  getAlertLevel() {
    let aChemicalCount = 0;
    this.warehouses.forEach((warehouse) => {
      if (warehouse.chemicalInventory) {
        if (warehouse.chemicalInventory.A) {
          aChemicalCount =
            aChemicalCount + parseInt(warehouse.chemicalInventory.A);
        }
      }
    });
    if (aChemicalCount >= 15) {
      return true;
    } else {
      return false;
    }
  }

  getRemainingCapacityOfSite() {
    let totalRemainingCapacity = 0;
    this.warehouses.map((warehouse) => {
      totalRemainingCapacity =
        totalRemainingCapacity +
        warehouse.getChemicalsinStorage().remainingStorage;
    });
    return totalRemainingCapacity;
  }
  // getTotalNumberOfChemicals() {}
  processTicket(ticket) {
    ticket.status = "pending";
    if (ticket.type === "incoming") {
      console.log("incoming");
      if (this.getRemainingCapacityOfSite() >= ticket.totalAmount) {
        const placementArray = this.getWarehousesToStoreChemicals(ticket);

        // console.log(placementArray)
        if (placementArray) {
          ticket.status = "Approved";

          const job = new Job("inProcess", ticket.type, placementArray);
          return job;
        } else {
          ticket.status = "Denied";
          return false;
        }
      }
    } else {
      const placementArray = this.dispatchChemicals(ticket);
      if (placementArray) {
        ticket.status = "Approved";
        const job = new Job("inProcess", ticket.type, placementArray);
        return job;
      } else {
        ticket.status = "Denied";
        return false;
      }
    }
  }

  placeIndividualChemicalTypes(amount, chemical, ticket) {
    let aWarehousesToStore = [];
    let warehouseId;
    for (let i = 0; i < amount; i++) {
      const warehouseToStore = this.warehouses.find((warehouse, index) => {
        // console.log('os', warehouse.chemicalInventory)
        const chemicalsAllowed = warehouse.getChemicalsinStorage()
          .chemicalsAllowed;
        const remainingStorage = warehouse.getChemicalsinStorage()
          .remainingStorage;
        console.log(warehouse.getChemicalsinStorage().chemicalsAllowed);
        // console.log(warehouse)
        if (chemicalsAllowed.includes(chemical)) {
          if (chemical === "A") {
            let nextWarehouse = this.warehouses[index + 1];
            let previousWarehouse = this.warehouses[index - 1];
            if (nextWarehouse && nextWarehouse.chemicalInventory) {
              if (nextWarehouse.chemicalInventory.A) {
                return false;
              }
            }
            if (previousWarehouse && previousWarehouse.chemicalInventory) {
              if (previousWarehouse.chemicalInventory.A) {
                return false;
              }
            }
            if (remainingStorage !== 0) {
              if (warehouse.chemicalInventory === undefined) {
                warehouse.chemicalInventory = { [chemical]: 1 };
              } else if (!warehouse.chemicalInventory[chemical]) {
                warehouse.chemicalInventory[chemical] = 1;
              } else {
                ++warehouse.chemicalInventory[chemical];
              }
              --ticket.chemicals[chemical];
              --ticket.totalAmount;
              // warehouseId = warehouse.id

              return warehouse;
            }
          } else {
            if (remainingStorage !== 0) {
              if (warehouse.chemicalInventory === undefined) {
                warehouse.chemicalInventory = { [chemical]: 1 };
              } else if (!warehouse.chemicalInventory[chemical]) {
                warehouse.chemicalInventory[chemical] = 1;
              } else {
                ++warehouse.chemicalInventory[chemical];
              }
              --ticket.chemicals[chemical];
              --ticket.totalAmount;
              if (warehouse.chemicalInventory[chemical] === 0) {
                delete warehouse.chemicalInventory[chemical];
              }

              // warehouseId = warehouse.id
              return warehouse;
            }
          }
        }
      });
      if (warehouseToStore) {
        const warehouseId = warehouseToStore.id;

        let existingInArray = aWarehousesToStore.filter(
          (placement) => placement.warehouse === warehouseId
        );
        if (existingInArray.length) {
          // console.log('a',existingInArray)

          const index = aWarehousesToStore.findIndex(
            (placement) =>
              placement.warehouse === warehouseId &&
              placement.chemical === chemical
          );

          aWarehousesToStore[index].amount++;
        } else {
          aWarehousesToStore.push({
            warehouse: warehouseId,
            chemical: chemical,
            amount: 1,
          });
        }
      }
    }
    // aWarehousesToStore.forEach(a=> console.log('a:',a))
    console.log(aWarehousesToStore);
    return aWarehousesToStore;
  }

  getWarehousesToStoreChemicals(ticket) {
    let placeMentArray = [];
    Object.keys(ticket.chemicals).map((chemical) => {
      const amount = ticket.chemicals[chemical];
      let individualChemicalWarehouses = this.placeIndividualChemicalTypes(
        amount,
        chemical,
        ticket
      );
      // console.log(individualChemicalWarehouses)
      placeMentArray.push(...individualChemicalWarehouses);
    });
    if (ticket.totalAmount !== 0) {
      return false;
    }
    return placeMentArray;
  }

  dispatchChemicals(ticket) {
    // console.log(ticket)
    let aWarehousesToRemoveFrom = [];
    Object.keys(ticket.chemicals).map((chemical) => {
      const amount = ticket.chemicals[chemical];
      for (let i = 0; i < amount; i++) {
        const warehouseToRemoveFrom = this.warehouses.find((warehouse) => {
          if (warehouse.chemicalInventory) {
            if (
              warehouse.chemicalInventory[chemical] &&
              warehouse.chemicalInventory[chemical] !== 0
            ) {
              /* should only update information on placeholder and
                             send updated information along if ticket can be successfully completed*/

              --warehouse.chemicalInventory[chemical];

              --ticket.chemicals[chemical];
              --ticket.totalAmount;

              return { ...warehouse };
            } else {
              return false;
            }
          }
        });
        if (warehouseToRemoveFrom) {
          const warehouseId = warehouseToRemoveFrom.id;
          let existingInArray = aWarehousesToRemoveFrom.filter(
            (placement) => placement.warehouse === warehouseId
          );
          if (existingInArray.length) {
            // console.log(existingInArray)
            let index = aWarehousesToRemoveFrom.findIndex(
              (placement) => placement.warehouse === warehouseId
            );
            aWarehousesToRemoveFrom[index].amount++;
          } else {
            aWarehousesToRemoveFrom.push({
              warehouse: warehouseId,
              chemical: chemical,
              amount: 1,
            });
          }
        }
      }
    });
    if (ticket.totalAmount !== 0) {
      console.log("coult not do job");
      return false;
    } else {
      return aWarehousesToRemoveFrom;
    }
  }
}

// Check where chemicals can be stored.
// what chemicals are in ticket...
// get allowed chemicals and remaining storage from all warehouses
// make sure A is not next to warehouse containing A

module.exports = Site;
