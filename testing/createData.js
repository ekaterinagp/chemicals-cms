const Site = require('./site')
const Warehouse = require('./warehouse')
const Ticket = require('./ticket')
const Job = require('./job')

const axios = require('axios')
// 10, 12, 5, 3, 9


let site1 = new Site(1)
let site2 = new Site(2)

let ticket1 = new Ticket('incoming', {'A': 1, 'C':2})
let ticket2 = new Ticket('incoming', {'B': 7, 'C':3})
let ticket3 = new Ticket('incoming', {'C':7})
let ticket4 = new Ticket('outgoing', {'C':7})
let ticket5 = new Ticket('outgoing', {'A':2})
let ticket6 = new Ticket('incoming', {'A':5, 'C':7})


// site1.processTicket(ticket1)
// // console.log(site1.warehouses)
// site1.processTicket(ticket2)
// // console.log(site1.warehouses)
// site1.processTicket(ticket4)
// console.log(ticket4.status)
// if(ticket4.status === 'Denied'){
//     site1.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
// }
// console.log(site1.warehouses)
// site2.processTicket(ticket3)
// console.log(site2.warehouses)
// site2.processTicket(ticket4)
// console.log(site2.warehouses)
// site2.processTicket(ticket5)
// console.log(site2.warehouses)
// site2.processTicket(ticket6)
// console.log(site2.warehouses)



let aWarehouses = []
let aWarehouses1 = []


const fetchWarehouses = async () => {
    const response = await axios('http://localhost/warehouses')
    const warehouses = await response.data
    // console.log(warehouses)
    warehouses.forEach(warehouse => {
        if(warehouse.id <= 5){
            aWarehouses.push(new Warehouse(warehouse.id, warehouse.capacity))
        }else{
            aWarehouses1.push(new Warehouse(warehouse.id, warehouse.capacity))
        }       
    })
    site1.warehouses= aWarehouses
    site2.warehouses= aWarehouses1
}


const assignWarehouses = async () =>{
    await fetchWarehouses()
    // fill warehouses with chemicals
    for await (warehouse of site1.warehouses){
        warehouse.chemicalInventory = await fetchWarehouseStock(warehouse.id)
    }
    for await (warehouse of site2.warehouses){
        warehouse.chemicalInventory = await fetchWarehouseStock(warehouse.id)
    }
    // process ticket 
    // let job = site2.processTicket(ticket5)
    let job = site1.processTicket(ticket1)
    // console.log(ticket4)
    console.log(job)
    if(job.status === 'inProcess'){ 
        for await (warehouse of site1.warehouses){
            warehouse.chemicalInventory = await fetchWarehouseStock(warehouse.id)
        }
        for await (warehouse of site2.warehouses){
            warehouse.chemicalInventory = await fetchWarehouseStock(warehouse.id)
        }
            console.log(site1)
         if(sendJobToWarehouses(site1, job)){
        //     //  TODO: send job, and updated warehouses to db
            const response = await axios.post(`http://localhost/processJob`, {job})
            console.log(response)
            // console.log('yes')
         }else{
            // console.log(job denied) 
         }
    }
    
}
assignWarehouses()

const fetchWarehouseStock = async (id) => {
        const response = await axios(`http://localhost/currentstock/${id}`)
        const warehouseStock = await response.data
        let stockObj = {}
        warehouseStock.map(stock => {
                temp ={}
                temp[stock.chemical] = stock.amount
                stockObj = {...temp, ...stockObj}
                return temp
            })
           
            return stockObj
}


const sendJobToWarehouses = async (site, job) => {
    job.placementArray.map( (placement, index) =>{
        const key =   Object.keys(placement)
        // console.log(placement.warehouse)
        site.warehouses.find((warehouse, index) => {
            if(warehouse.id === placement.warehouse){
            console.log(warehouse.id)
            return warehouse.checkIfSpaceForChemicals(job)
            }else{
                return false;
            }
        })
    })
}





/* first I need to fetch warehouse to save into the site classes
then I need to fill those warehouses with inventory
then I need to make a ticket
    process ticket
    if it is approved, it becomes a job
    then I have to revert the warehouses to original state from fetching
    */ 