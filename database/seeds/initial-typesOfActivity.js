<<<<<<< HEAD

const fs = require ('fs-extra');

const path = require ('path');

const knex = require('knex');


=======
const fs = require("fs-extra");
const path = require("path");
>>>>>>> dc339a5f45d3a426c0b76c317a046bf8faffa8e5

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
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
