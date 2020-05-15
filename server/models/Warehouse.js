const { Model } = require("objection");

const WarehouseItem = require("./WarehouseItem");

class Warehouse extends Model {
  static get tableName() {
    return "warehouse";
  }

  static get relationMappings() {
    return {
      warehouseitem: {
        relation: Model.HasManyRelation,
        modelClass: WarehouseItem,
        join: {
          from: "warehouse.id",
          to: "warehouseitem.warehouse_id",
        },
      },
    };
  }
}

module.exports = Warehouse;
