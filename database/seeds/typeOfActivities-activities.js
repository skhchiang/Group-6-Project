// merchants_products.js
const typeOfActivitiesData = require('./typeOfActivities');
const activitiesData = require('./activities');

exports.seed = function(knex, Promise) {
  return knex('activities').del()
  .then(() => {
    return knex('typeOfActivities').del();
  })
  .then(() => {
    return knex('typeOfActivities').insert(typeOfActivitiesData);
  })
  .then(() => {
    let activityPromises = [];
    activitiesData.forEach((activity) => {
      let typeOfActivities = activity.typeOfActivities;
      activityPromises.push(createActivity(knex, activity, typeOfActivity));
    });
    return Promise.all(activityPromises);
  });
};
const createActivity = (knex, activity, typeOfActivity) => {
  return knex('typeOfActivities').where('name', 'typeOfActivity').first()
  .then((typeOfActivityRecord) => {
    return knex('activities').insert({
      name: activity.name,
      typeOfActivities_id: typeOfActivityRecord.id,
      addresss: activitiy.address,
      description:activity.description,
      photo:activity.photo,
      is_active:activity.is_active
    });
  });
};



