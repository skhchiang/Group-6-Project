var Promise = require("bluebird");

class ActivityService {
  constructor(knex) {
    this.knex = knex; //class BuilderService use knex !!
  }

  make(data, user) {
    return this.knex.transaction(function(trx) {
      return trx
        .insert(
          [
            {
              name: data.name,
              address: data.address,
              description: data.description,
              reviewing_status: false,
              is_active: false
            }
          ],
          "id"
        ) //"id" = return  the new activity's id
        .into("activities")
        .then(function(ids) {
          console.log("ids", ids);
          return Promise.map(data.activities, function(activity) {
            let itinAct = {
              activities_id: ids[0], // assume inserted 2/3 itin, ids[0] is the id of first itin
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

module.exports = ActivityService;
