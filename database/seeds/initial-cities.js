const fs = require("fs-extra");
const path = require("path");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cities")
    .del()
    .then(function() {
      let cities = fs.readJsonSync(path.join(__dirname, "/cityList.json"));

      // Inserts seed entries
      return knex("cities").insert(cities);
    });
};
