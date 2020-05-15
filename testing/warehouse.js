// create a warehouse class containing chemicals

class Warehouse {

    constructor(id, capacity, chemicalInventory){
        this.id = id
        this.capacity = capacity
        this.chemicalInventory = chemicalInventory
    } 

    getChemicalsinStorage(){
        if(this.chemicalInventory !== undefined){
            let chemicalsAllowed;
            // const chemicalInventory = Object.keys(this.chemicalInventory)
            let totalAmount = Object.values(this.chemicalInventory)        
            totalAmount =  totalAmount.reduce((a, b) => a + b, 0)
            if(this.chemicalInventory.A){
                chemicalsAllowed = ['A', 'C']
            }else if(this.chemicalInventory.B){
                chemicalsAllowed = ['B', 'C']
            }else if(this.chemicalInventory.C){
                chemicalsAllowed = ['A', 'B', 'C']
            }
            return {chemicalsAllowed, remainingStorage: this.capacity - totalAmount}
        }else{
            return {chemicalsAllowed: ['A', 'B', 'C'], remainingStorage: this.capacity}
        }
    }
 
    checkIfSpaceForChemicals(job){
        // console.log('remaining:', this.getChemicalsinStorage().remainingStorage, 'capacity: ', this.capacity)
        const chemicalsForWarehouse= job.placementArray.filter(chemicalPlacement => chemicalPlacement.warehouse === this.id)
        let isSpace = chemicalsForWarehouse.map(chemicalPlacement => {
            if(job.type ==='outgoing'){
                if(this.capacity >= chemicalPlacement.amount 
                    && this.getChemicalsinStorage().chemicalsAllowed.indexOf(chemicalPlacement.chemical)!== -1){
                        return true
                    }
                    return false
                    
                }else if(job.tyoe ==='incoming'){
                    if(this.getChemicalsinStorage().remainingStorage >= chemicalPlacement.amount 
                    && this.getChemicalsinStorage().chemicalsAllowed.indexOf(chemicalPlacement.chemical)!== -1){
                        return true
                    }
                    return false
                    
                }
                
            })
            if(!isSpace.includes(false)){
                if(job.type ==='outgoing'){
                    chemicalsForWarehouse.map(chemical => {
                        console.log(chemical.chemical)
                        this.chemicalInventory[chemical.chemical] = this.chemicalInventory[chemical.chemical] - chemical.amount
                        if(this.chemicalInventory[chemical.chemical] === 0){
                            delete this.chemicalInventory[chemical.chemical]
                        }
                        // console.log('bla',this.chemicalInventory)
                })
            }else{
                console.log('incoming')
            }
        }
        return
        
    }

}


module.exports = Warehouse