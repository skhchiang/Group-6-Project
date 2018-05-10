const fs = require ('fs-extra');
const path = require ('path');
const knex = require('knex');

exports.seed = function(knex, Promise) {
  return knex("typeOfActivities")
    .del()
    .then(function() {
      let typeOfActivities = fs.readJsonSync(
        path.join(__dirname, "/attractionTypeList.json")
      );
      return knex("typeOfActivities").insert(typeOfActivities);
    });
};
