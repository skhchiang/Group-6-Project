class ProfileService {
  constructor(knex) {
    this.knex = knex;
  }

  search(user) {
    return this.knex("users_itineraries")
      .select("itineraries_id")
      .join("users", "users_itineraries.users_id", "users.id")
      .where("users.id", user.id)
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
                    activity_description: activityArray[i].description,
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
}

module.exports = ProfileService;
