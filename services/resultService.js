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

<<<<<<< HEAD
      // let query = this.knex.select('itineraries.id', 'itineraries.name', 'itineraries.description').from('itineraries')
      // .join('cities','itineraries.cities_id','cities.id')
      // .join('','typeOfActivities.id', 'activities.typeOfActivities_id')
      // .whereIn('cities_id',subquery1)
      // .andWhere('typeOfActivities_id',subquery2)

      let query = this.knex("cities")
        .innerJoin("activities", "activities.cities_id", "cities.id")
        .leftJoin("itineraries", "itineraries.cities_id", "cities.id")
        .leftJoin(
          "typeOfActivities",
          "typeOfActivities.id",
          "activities.typeOfActivities_id"
        )
        .where("cities.id", subquery1)
        .andWhere("typeOfActivities.id", subquery2);

      // console.log(query.toSQL());
      // console.log(subquery1.toSQL());
      // console.log(subquery2.toSQL());

      return query.then(rows => {
        console.log(rows);
        return rows.map(r => ({
          id: r.id,
          name: r.name,
          city: cities,
          typeOfActivities: typeOfActivities,
          address: r.address,
          description: r.description,
          photo: r.photo,
          reviewing_status: r.reviewing_status
        }));
=======
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
>>>>>>> ddcd6d22220961c369e1c5591c3d345352e52727
      });
  }

  save(userId, data) {
    return this.knex("users_itineraries").insert({
      users_id: user.id,
      itineraries_id: body.id,
      is_create: false
    });
  }
}
module.exports = ResultService;
