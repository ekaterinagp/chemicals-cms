const { Model } = require("objection");

class Audit extends Model {
  static get tableName() {
    return "user";
  }
}

module.exports = Audit;
