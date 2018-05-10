const fs = require ('fs-extra');
const path = require ('path');
const knex = require('knex');

exports.seed = function(knex, Promise) {
  return knex("cities")
    .del()
    .then(function() {
      let cities = fs.readJsonSync(path.join(__dirname, "/cityList.json"));
      return knex("cities").insert(cities);
    });
};
