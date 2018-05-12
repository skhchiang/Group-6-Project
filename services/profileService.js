class ProfileService {
  constructor(knex) {
    this.knex = knex; //class BuilderService use knex !!
  }

  search(user) {
    let query = this.knex
      .select(
        "itineraries.name",
        "itineraries.description"
      )
      .from("users_itineraries")
      .join("users", "users_itineraries.users_id", "users.id")
      .join("itineraries", "users_itineraries.itineraries_id", "itineraries.id")
      .where("users.name", user.name)
      
    return query.then(rows => {
      return rows.map(r => ({
        id: r.id,
        name: r.name,
        address: r.address,
        description: r.description,
        photo: r.photo,
        city: cities,
        typeOfActivity: typeOfActivities
      }));
    });
  }
}

module.exports = ProfileService;
