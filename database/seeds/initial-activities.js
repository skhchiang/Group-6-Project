const fs = require("fs-extra");
const path = require("path");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cities")
    .del()
    .then(function() {
      return knex("typeOfActivities").del();
    })
    .then(function() {
      return knex("activities").del();
    })
    .then(function() {
      let Cities = fs.readJsonSync(path.join(__dirname, "/cityList.json"));
      return knex("cities").insert(Cities);
    })
    .then(function() {
      let TypesOfActivities = fs.readJsonSync(path.join(__dirname, "/attractionTypeList.json"));
      return knex("typeOfActivities").insert(TypesOfActivities);
    })
    .then(function(){
        let activityPromise = [];
        Activities.forEach(function(activity){
            let typeOfActivity = activity.type
            activityPromise.push(createActivity(knex, activity, typeOfActivity))
        })
    })
}; 

const createActivity = function (knex, activity, typeOfActivity){
    return knex('typeOfActivities').where('type', typeOfActivity).first()
    .then (function (typeOfActivityRecord){
        return knex('activities').insert({
            name: activity.name,
            address: activity.address,
            description: activity.description,
            typeOfActivity_id: typeOfActivityRecord.id
        });
    });
};

// let Activities = fs.readJsonSync(path.join(__dirname, "/activities.json"));
// console.log(Activities.length); //result 1958
// typeOfActivities_id: knex("typeOfActivities").select('id').where('name', 'type')
// ({ name: Activities.name, address: Activities.address, description: Activities.description})
