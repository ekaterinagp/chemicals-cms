const { Model } = require("objection");

const Warehouse = require("./Warehouse");
const JobItem = require("./JobItem");

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
      jobitem: {
        relation: Model.HasOneRelation,
        modelClass: JobItem,
        join: {
          from: "job.id",
          to: "jobItem.job_id",
        },
      },
    };
  }
}

module.exports = Job;
