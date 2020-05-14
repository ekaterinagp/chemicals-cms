const { Model } = require("objection");
const Warehouse = require("./Warehouse");

class ChemicalStock extends Model {
  static get tableName() {
    return "chemicalStock";
  }

  static get relationMappings() {
    return {
      warehouse: {
        relation: Model.HasOneRelation,
        modelClass: Warehouse,
        join: {
          from: "chemicalStock.warehouse_id",
          to: "warehouse.id",
        },
      },
    };
  }
}

module.exports = ChemicalStock;
