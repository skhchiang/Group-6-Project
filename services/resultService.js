class ResultService {
  constructor(knex) {
    this.knex = knex; //class BuilderService use knex !!
  }

  result(cities, typeOfActivities) {
    if (
      typeof cities !== "undefined" &&
      typeof typeOfActivities !== "undefined"
    ) {
      var subquery1 = this.knex
        .select("id")
        .from("cities")
        .where("name", cities);
      var subquery2 = this.knex
        .select("id")
        .from("typeOfActivities")
        .where("name", typeOfActivities);

      // let query = this.knex.select('itineraries.id', 'itineraries.name', 'itineraries.description').from('itineraries')
      // .innerJoin('cities','itineraries.cities_id','cities.id')
      // .innerJoin('','typeOfActivities.id', 'activities.typeOfActivities_id')
      // .whereIn('cities_id',subquery1)
      // .andWhere('typeOfActivities_id',subquery2)

      let query = this.knex("cities")
        .innerJoin("activities", "activitie.cities_id", "cities.id")
        .leftJoin("itineraries", "itineraries.cities_id", "cities.id")
        .leftJoin(
          "typeOfActivities",
          "typeOfActivities.id",
          "activities.typeOfActivities_id"
        )
        .where("cities.id", subquery1)
        .andWhere("typeOfActivities.id", subquery2);

      // console.log(query.toSQL());
      // console.log(subquery1.toSQL());
      // console.log(subquery2.toSQL());

      return query.then(rows => {
        console.log(rows);
        return rows.map(r => ({
          id: r.id,
          name: r.name,
          city: cities,
          typeOfActivities: typeOfActivities,
          address: r.address,
          description: r.description,
          photo: r.photo,
          reviewing_status: r.reviewing_status
        }));
      });
    }
  }

  save(user, body) {
    return this.knex("users_itineraries").insert({
      users_id: 1,
      itineraries_id: body.id,
      is_create: false
    });
  }
}

module.exports = ResultService;
