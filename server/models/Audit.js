const { Model } = require("objection");

class Audit extends Model {
  static get tableName() {
    return "audit";
  }
}

module.exports = Audit;
