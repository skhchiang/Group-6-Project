var Promise = require("bluebird");

class BuilderService {
  constructor(knex) {
    this.knex = knex; //class BuilderService use knex !!
  }

  search(cities, typeOfActivities) {
    if (
      typeof cities !== "undefined" &&
      typeof typeOfActivities !== "undefined"
    ) {
      let query = this.knex
        .select(
          "activities.id",
          "activities.name",
          "activities.address",
          "activities.description",
          "activities.photo",
          "activities.reviewing_status"
        )
        .from("activities")
        .join("cities", "activities.cities_id", "cities.id")
        .join(
          "typeOfActivities",
          "activities.typeOfActivities_id",
          "typeOfActivities.id"
        )
        .where("cities.name", cities)
        .where("typeOfActivities.name", typeOfActivities);

      return query.then(rows => {
        return rows.map(r => ({
          id: r.id,
          name: r.name,
          address: r.address,
          description: r.description,
          photo: r.photo,
          city: cities,
          typeOfActivity: typeOfActivities
        }));
      });
    }
  }

  create(data, user) {
    console.log("data.activities", data["activities[]"]);
    return this.knex.transaction(function(trx) {
      return trx
        .insert([{ name: data.itinName, description: data.itinDesc }], "id") //"id" = return  the new iti's id
        .into("itineraries")
        .then(function(ids) {
          console.log("ids", ids);
          return Promise.map(data["activities[]"], function(activity) {
            let itinAct = {
              itineraries_id: ids[0], // assume inserted 2/3 itin, ids[0] is the id of first itin
              activities_id: activity
            };
            return trx
              .insert(itinAct)
              .into("itineraries_activities")
              .returning("itineraries_id");
          });
        })
        .then(function(ids) {
          console.log(ids);

          let itiUser = {
            itineraries_id: ids[0][0],
            users_id: user,
            is_create: true
          };
          return trx.insert(itiUser).into("users_itineraries");
        });
    });
  }
}

module.exports = BuilderService;
