const fs = require("fs-extra");
const path = require("path");

exports.seed = function(knex, Promise) {
//   let Cities = fs.readJsonSync(path.join(__dirname, "/cityList.json"));
//   return knex("cities")
//     .insert(Cities)
//     .then(function() {
//       let TypesOfActivities = fs.readJsonSync(
//         path.join(__dirname, "/attractionTypeList.json")
//       );
//       return knex("typeOfActivities")
//         .insert(TypesOfActivities)
//         .then(function() {
//           let Activities = fs.readJsonSync(
//             path.join(__dirname, "/activities.json")
//           );
//           return knex("cities")
//             .select("*")
//             .then(cities => {
//               return knex("typeOfActivities")
//                 .select("*")
//                 .then(types => {
//                   Activities.forEach(obj => {
//                     let foundActivity = types.find(element => {
//                       return element.name == obj.type;
//                     });
//                     let foundCity = cities.find(element => {
//                       return element.name == obj.city;
//                     });
//                     return knex("activities")
//                       .insert({
//                         name: obj.name,
//                         address: obj.address,
//                         cities_id: foundCity.id,
//                         description: obj.description,
//                         photo: obj.photo,
//                         is_active: obj.is_active,
//                         typeOfActivities_id: foundActivity.id
//                       })
//                       .then(() => {});
//                   });
//                 });
//             });
//         });
//     });
};
