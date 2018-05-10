const fs = require("fs-extra");
const path = require("path");

exports.seed = function(knex, Promise) {
  let Cities = fs.readJsonSync(path.join(__dirname, "/cityList.json"));
  let TypesOfActivities = fs.readJsonSync(path.join(__dirname, "/attractionTypeList.json"));
  let Activities = fs.readJsonSync(path.join(__dirname, "/activities.json"));
  // return knex("cities")
  //   .del()
  //   .then(function() {
  //     return knex("cities")
  //       .insert(Cities)
  //       .then(function() {

  //         );
  //         return knex("typeOfActivities")
  //           .del()
  //           .then(function() {
  //             return knex("typeOfActivities").insert(TypesOfActivities);
  //           })
  //           .then(function() {

  return knex("cities")
    .select("*")
    .then(cities => {
      return knex("typeOfActivities")
        .select("*")
        .then(types => {
          Activities.forEach(obj => {
            let foundActivity = types.find(element => {
              return element.name == obj.type;
            });
            let foundCity = cities.find(element => {
              return element.name == obj.city;
            });
            console.log(obj);
            return knex("activities")
              .insert({
                name: obj.name,
                typeOfActivities_id: foundActivity.id,
                cities_id: foundCity.id,
                address: obj.address,
                description: obj.description,
                photo: obj.photo,
                is_active: obj.is_active
              })
              .then(() => {});
          });
        });
    });
  //         });
  //     });
  // });
};
