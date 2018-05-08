<<<<<<< HEAD

=======
<<<<<<< HEAD
>>>>>>> master

const fs = require ('fs-extra');

const path = require ('path');

const knex = require('knex');


<<<<<<< HEAD
=======
=======
const fs = require("fs-extra");
const path = require("path");
>>>>>>> dc339a5f45d3a426c0b76c317a046bf8faffa8e5

>>>>>>> master
exports.seed = function(knex, Promise) {
<<<<<<< HEAD
  // Deletes ALL existing entries
  // return knex("typeOfActivities")
  //   .del()
  //   .then(function() {
  //     let typeOfActivities = fs.readJsonSync(
  //       path.join(__dirname, "/attractionTypeList.json")
  //     );
=======
//  Deletes ALL existing entries
  return knex("typeOfActivities")
    .del()
    .then(function() {
      let typeOfActivities = fs.readJsonSync(
        path.join(__dirname, "/attractionTypeList.json")
      );
>>>>>>> 7eb64cf235530a7d59072674a71e210cee499d67

  //     // Inserts seed entries
  //     return knex("typeOfActivities").insert(typeOfActivities);
  //   });
};
