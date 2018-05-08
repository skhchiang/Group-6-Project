const fs = require ('fs-extra');

const path = require ('path');

const knex = require('knex');



exports.seed = function(knex, Promise) {
//   return knex("cities")
//   .del()
//   .then(function() {
//     return knex("typeOfActivities").del();
//   })
//   .then(function() {
//     return knex("activities").del();
//   })
//   .then(function() {
//     let Cities = fs.readJsonSync(path.join(__dirname, "/cityList.json"));
//     return knex("cities").insert(Cities);
//   })
//   .then(function() {
//     let TypesOfActivities = fs.readJsonSync(path.join(__dirname, "/attractionTypeList.json"));
//     return knex("typeOfActivities").insert(TypesOfActivities);
//   })
// .then(() => {
//   let activityPromises = [];
//   activitiesData.forEach((activity) => {
//     let typeOfActivities = activity.typeOfActivities;
//     activityPromises.push(createActivity(knex, activity, typeOfActivity));
//   });
//   return Promise.all(activityPromises);
// });
// };
// const createActivity = (knex, activity, typeOfActivity) => {
// return knex('typeOfActivities').where('name', 'typeOfActivity').first()
// .then((typeOfActivityRecord) => {
//   return knex('activities').insert({
//     name: activity.name,
//     typeOfActivities_id: typeOfActivityRecord.id,
//     addresss: activitiy.address,
//     description:activity.description,
//     photo:activity.photo,
//     is_active:activity.is_active
//   });
// });
  };

  
      

   

