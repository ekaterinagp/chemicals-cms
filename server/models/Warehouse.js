const { Model } = require("objection");

// const Site = require("./Site");
const ChemicalStock = require("./ChemicalStock");
const JobItem = require("./JobItem");

class Warehouse extends Model {
  static get tableName() {
    return "warehouse";
  }
  // static get idColumn() {
  //     return "nWarehouseID";
  // }

  static get relationMappings() {
    return {
      chemicalStock: {
        relation: Model.HasManyRelation,
        modelClass: ChemicalStock,
        join: {
          from: "warehouse.id",
          to: "chemicalStock.warehouse_id",
        },
      },

      JobItem: {
        relation: Model.HasManyRelation,
        modelClass: JobItem,
        join: {
          from: "warehouse.id",
          to: "jobItem.warehouse_id",
        },
      },
    };
  }
}

module.exports = Warehouse;
