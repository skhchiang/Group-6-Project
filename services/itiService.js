class ItiService {
  constructor(knex) {
    this.knex = knex; //class ItiService use knex !!
  }

  list() {
    let query = this.knex('activities').select('activities.id', 'activities.name');

    return query.then(rows => {
      return rows.map(r => ({
        id: r.id,
        name: r.name
      }));
    });
  }
}

module.exports = ItiService;
