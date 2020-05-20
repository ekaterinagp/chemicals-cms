// create a warehouse class containing chemicals

class Warehouse {
  constructor(id, capacity, chemicalInventory) {
    this.id = id;
    this.capacity = capacity;
    this.chemicalInventory = chemicalInventory;
  }

  getChemicalsinStorage() {
    let chemicalsAllowed;

    if (Object.values(this.chemicalInventory).includes(0)) {
      Object.keys(this.chemicalInventory).forEach((chemical) => {
        if (this.chemicalInventory[chemical] === 0) {
          console.log("delete", chemical, this.chemicalInventory[chemical]);
          delete this.chemicalInventory[chemical];
        }
      });
    }

    if (Object.keys(this.chemicalInventory).length !== 0) {
      // const chemicalInventory = Object.keys(this.chemicalInventory)
      let totalAmount = Object.values(this.chemicalInventory);
      totalAmount = totalAmount.reduce((a, b) => a + b, 0);
      if (this.chemicalInventory.A) {
        chemicalsAllowed = ["A", "C"];
      } else if (this.chemicalInventory.B) {
        chemicalsAllowed = ["B", "C"];
      } else if (this.chemicalInventory.C) {
        chemicalsAllowed = ["A", "B", "C"];
      }
      return {
        chemicalsAllowed,
        remainingStorage: this.capacity - totalAmount,
      };
    } else {
      return {
        chemicalsAllowed: ["A", "B", "C"],
        remainingStorage: this.capacity,
      };
    }
  }

  checkIfSpaceForChemicals(job) {
    // console.log('remaining:', this.getChemicalsinStorage().remainingStorage, 'capacity: ', this.capacity)
    const chemicalsForWarehouse = job.placementArray.filter(
      (chemicalPlacement) => chemicalPlacement.warehouse === this.id
    );
    let isSpace = chemicalsForWarehouse.map((chemicalPlacement) => {
      // console.log(chemicalPlacement.chemical)
      if (job.type === "outgoing") {
        if (
          this.chemicalInventory[chemicalPlacement.chemical] >=
          chemicalPlacement.amount
        ) {
          console.log(this.chemicalInventory[chemicalPlacement.chemical]);
          return true;
        } else {
          return false;
        }
      } else if (job.type === "incoming") {
        if (
          this.getChemicalsinStorage().remainingStorage >=
            chemicalPlacement.amount &&
          this.getChemicalsinStorage().chemicalsAllowed.indexOf(
            chemicalPlacement.chemical
          ) !== -1
        ) {
          return true;
        } else {
          return false;
        }
      }
    });
    console.log("space", isSpace);
    //     if(!isSpace.includes(false)){
    //         if(job.type ==='outgoing'){
    //             console.log('warehouse check outgoing')
    //             chemicalsForWarehouse.map(chemical => {
    //                 console.log(chemical)
    //                 this.chemicalInventory[chemical.chemical] = this.chemicalInventory[chemical.chemical] - chemical.amount
    //                 if(this.chemicalInventory[chemical.chemical] === 0){
    //                     delete this.chemicalInventory[chemical.chemical]
    //                 }
    //                 console.log('bla',this.chemicalInventory)
    //         })
    //     }else{
    //         console.log('warehouse check incoming')
    //         chemicalsForWarehouse.map(chemical => {
    //         if(!this.chemicalInventory[chemical.chemical]){
    //             this.chemicalInventory[chemical.chemical] = 1
    //         }else{
    //             this.chemicalInventory[chemical.chemical] = this.chemicalInventory[chemical.chemical] + chemical.amount
    //         }
    //     })
    //     }
    // }
    return isSpace;
  }
}

module.exports = Warehouse;
