class BuilderService {

    constructor(knex){
        
         this.knex = knex;                     //class BuilderService use knex !!
    }

    list(id) {
        if (typeof id !== 'undefined') {
            let query = this.knex.select('*')
                .from('activities')
                .where('id', id);
    
            return query.then((rows) => {
                console.log(rows);
                return rows.map(r => ({
                    id: r.id,
                    name: r.name
                }));
            });
        }else {
            console.log(err);
        }
    }
    }

    

module.exports = BuilderService;



