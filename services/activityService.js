var Promise = require("bluebird");

class ActivityService {
  constructor(knex) {
    this.knex = knex;
  }
}

module.exports = ActivityService;
