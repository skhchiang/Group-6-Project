var Promise = require("bluebird");

class ActivityService {
  constructor(knex) {
    this.knex = knex; //class BuilderService use knex !!
  }

  // make(body,user) {
  //   var subquery1 = this.knex
  //     .select("id")
  //     .from("cities")
  //     .where("name", body.city);
  //   var subquery2 = this.knex
  //     .select("id")
  //     .from("typeOfActivities")
  //     .where("name", body.typeOfActivities);

  //   return this.knex("activities").insert({
  //     name: body.name,
  //     address: body.address,
  //     description: body.description,
  //     photo: body.URL,
  //     reviewing_status: false,
  //     typeOfActivities_id: subquery2,
  //     cities_id: subquery1,
  //     is_active: true
  //   });
  // }
}

module.exports = ActivityService;
