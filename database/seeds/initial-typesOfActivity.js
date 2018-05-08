
const fs = require ('fs-extra');

const path = require ('path');

const knex = require('knex');


exports.seed = function(knex, Promise) {
//  Deletes ALL existing entries
  return knex("typeOfActivities")
    .del()
    .then(function() {
      let typeOfActivities = fs.readJsonSync(
        path.join(__dirname, "/attractionTypeList.json")
      );

      // Inserts seed entries
      return knex("typeOfActivities").insert(typeOfActivities);
    });
};
