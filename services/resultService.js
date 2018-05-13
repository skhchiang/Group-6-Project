class ResultService {
  constructor(knex) {
    this.knex = knex; //class BuilderService use knex !!
  }

  result(cities, typeOfActivities) {
    var subquery1 = this.knex
      .select("id")
      .from("cities")
      .where("name", cities);
    var subquery2 = this.knex
      .select("id")
      .from("typeOfActivities")
      .where("name", typeOfActivities);

    return this.knex("itineraries")
      .select("itineraries.name", "itineraries.id as itineraries_id")
      .join("cities", "itineraries.cities_id", "cities.id")
      .join(
        "itineraries_activities",
        "itineraries_activities.itineraries_id",
        "itineraries.id"
      )
      .join(
        "activities",
        "itineraries_activities.activities_id",
        "activities.id"
      )
      .where("cities.id", "in", subquery1)
      .andWhere("activities.typeOfActivities_id", "in", subquery2)
      .then(itinIdArray => {
        itinIdArray = itinIdArray.map(ele => ele.itineraries_id);
        return this.knex("itineraries")
          .select(
            "itineraries.id",
            "itineraries.name",
            "itineraries.description"
          )
          .where("itineraries.id", "in", itinIdArray)
          .then(ItinArray => {
            return this.knex("activities")
              .select(
                "activities.name",
                "activities.description",
                "activities.address",
                "activities.photo",
                "itineraries_activities.activities_id",
                "itineraries_activities.itineraries_id",
                "typeOfActivities.name as typeOfActivitiesName"
              )
              .join(
                "itineraries_activities",
                "itineraries_activities.activities_id",
                "activities.id"
              )
              .join(
                "typeOfActivities",
                "typeOfActivities.id",
                "activities.typeOfActivities_id"
              )
              .where("itineraries_activities.itineraries_id", "in", itinIdArray)
              .then(activityArray => {
                let resultActivityObject = {};
                for (var i = 0; i < activityArray.length; i++) {
                  let newElement = {
                    activity_name: activityArray[i].name,
                    activity_descripton: activityArray[i].description,
                    activity_address: activityArray[i].address,
                    activity_photo: activityArray[i].photo,
                    activity_type: activityArray[i].typeOfActivitiesName
                  };
                  let itinerary_id = activityArray[i].itineraries_id;
                  if (!Array.isArray(resultActivityObject[itinerary_id])) {
                    resultActivityObject[itinerary_id] = [newElement];
                  } else {
                    resultActivityObject[itinerary_id].push(newElement);
                  }
                }
                let result = ItinArray;
                for (let j = 0; j < ItinArray.length; j++) {
                  let itinId = ItinArray[j].id;
                  result[j].activities = resultActivityObject[itinId];
                }
                return result;
              });
          });
      });
  }

  save(user, body) {
    return this.knex("users_itineraries").insert({
      users_id: user.id,
      itineraries_id: body.id,
      is_create: false
    });
  }
}
module.exports = ResultService;
