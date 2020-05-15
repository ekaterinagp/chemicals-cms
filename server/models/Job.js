const { Model } = require("objection");

const Warehouse = require("./Warehouse");

class Job extends Model {
  static get tableName() {
    return "job";
  }

  static get relationMappings() {
    return {
      warehouse: {
        relation: Model.HasManyRelation,
        modelClass: Warehouse,
        join: {
          from: "job.warehouse_id",
          to: "warehouse.id",
        },
      },
    };
  }
}

module.exports = Job;
