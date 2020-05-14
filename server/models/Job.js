const { Model } = require("objection");

const JobItem = require("./JobItem");

class Job extends Model {
  static get tableName() {
    return "job";
  }

  static get relationMappings() {
    return {
      JobItem: {
        relation: Model.HasManyRelation,
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
