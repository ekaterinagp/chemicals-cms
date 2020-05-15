const { Model } = require("objection");

const Warehouse = require("./Warehouse");

class WarehouseItem extends Model {
  static get tableName() {
    return "warehouseitem";
  }

  static get relationMappings() {
    return {
      warehouse: {
        relation: Model.HasOneRelation,
        modelClass: Warehouse,
        join: {
          from: "warehouseitem.warehouse_id",
          to: "warehouse.id",
        },
      },
    };
  }
}

module.exports = WarehouseItem;
