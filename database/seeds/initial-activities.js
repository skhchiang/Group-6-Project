const fs = require("fs-extra");
const path = require("path");

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  // return knex("cities")
  //   .del()
    // .then(function () {
    //   return knex("typeOfActivities").del();
    // })
    // .then(function () {
    //   return knex("activities").del();
    // })
    // .then(function () {
      let Cities = fs.readJsonSync(path.join(__dirname, "/cityList.json"));
      return knex("cities").insert(Cities)
    // })
    .then(function () {
      let TypesOfActivities = fs.readJsonSync(path.join(__dirname, "/attractionTypeList.json"));
      return knex("typeOfActivities").insert(TypesOfActivities);

    })
    .then(function () {

      let Activities = fs.readJsonSync(path.join(__dirname, "/activities.json"));
      let activityPromise = [];

      return knex('cities').select('*').then((cities) => {
        return knex("typeOfActivities").select('*').then((types) => {

          Activities.forEach((obj) => {
          
            let foundActivity = types.find((element) => {
              return element.name == obj.type;
            })
            //console.log(foundActivity);
            
             
            
            
            let foundCity = cities.find((element) => {
              return element.name == obj.city;
            })
            // console.log(foundCity);

            
             

            // console.log(obj);
            // obj.typeOfActivites_id = foundObj.id;
          
            return knex('activities').insert({
              name: obj.name,
              address: obj.address,
              cities_id: foundCity.id,
              description: obj.description,
              photo: obj.photo,
              is_active: obj.is_active,
              typeOfActivities_id: foundActivity.id
            }).then(() => {
            

            })

          })
        })
      }
      )
    })
};

// const createActivity = function (knex, activity, typeOfActivity) {
//   return knex('typeOfActivities').where('type', typeOfActivity).first()
//     .then(function (typeOfActivityRecord) {
//       return knex('activities').insert({
//         name: activity.name,
//         address: activity.address,
//         description: activity.description,
//         typeOfActivity_id: typeOfActivityRecord.id
//       });
//     });
// };

// let Activities = fs.readJsonSync(path.join(__dirname, "/activities.json"));
// console.log(Activities.length); //result 1958
// typeOfActivities_id: knex("typeOfActivities").select('id').where('name', 'type')
// ({ name: Activities.name, address: Activities.address, description: Activities.description})
