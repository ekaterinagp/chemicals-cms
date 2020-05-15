const { Model } = require("objection");
const Job = require("./Job");
const Warehouse = require("./Warehouse");

class JobItem extends Model {
  static get tableName() {
    return "jobItem";
  }
  // static get idColumn() {
  //     return "id";
  // }

  static get relationMappings() {
    return {
      job: {
        relation: Model.HasOneRelation,
        modelClass: Job,
        join: {
          from: "jobItem.job_id",
          to: "job.id",
        },
      },
      warehouse: {
        relation: Model.HasOneRelation,
        modelClass: Warehouse,
        join: {
          from: "jobItem.warehouse_id",
          to: "warehouse.id",
        },
      },
    };
  }
}

module.exports = JobItem;
