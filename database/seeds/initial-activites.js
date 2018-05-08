const fs = require ('fs-extra');

const path = require ('path');

const knex = require('knex');



exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('activities').del()
    .then(function () {

      let activities = fs.readJsonSync(path.join(__dirname,"/activities.json"));

      for (var i= 0; i<activities.length; i++){
        return knex("activities").insert({name: activities[0].name, typeOfActivities_id: (knex.select("id").from("typeOfActivities").where("name","type")) });

      }
    });
  };

  // console.log(knex.select("id").from("typeOfActvities").where("name","type"));
      

   

