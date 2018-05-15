const fs = require("fs-extra");
const path = require("path");

exports.seed = (knex, Promise) => {
  let Activities = fs.readJsonSync(path.join(__dirname, "/activities.json"));
  let Cities = fs.readJsonSync(path.join(__dirname, "/cityList.json"));
  let TypesOfActivities = fs.readJsonSync(path.join(__dirname, "/attractionTypeList.json"));

  return knex("cities").insert(Cities)
    .then(() => {
      return knex("typeOfActivities").insert(TypesOfActivities);
    })
    .then(() => {
      let activityArray = [];
      Activities.forEach(activity => {
        let typeOfActivity = activity.type;
        let cities = activity.city;
        activityArray.push(createActivity(knex, activity, typeOfActivity, cities));
      });
      return Promise.all(activityArray);
    });
};

const createActivity = (knex, activity, typeOfActivity, cities) => {
  return knex("typeOfActivities")
    .where("name", typeOfActivity)
    .first()
    .then(typeOfActivityRecord => {
      return knex("cities")
        .where("name", cities)
        .first()
        .then(cities => {
          return knex("activities").insert({
            name: activity.name,
            typeOfActivities_id: typeOfActivityRecord.id,
            cities_id: cities.id,
            address: activity.address,
            description: activity.description,
            photo: activity.photo,
            is_active: activity.is_active,
            reviewing_status: activity.reviewing_status
          });
        });
    });
};