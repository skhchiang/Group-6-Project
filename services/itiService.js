
class ItiService {
    constructor(knex){
        this.knex = knex                      //class ItiService use knex !!
    }

    list() {
        return this.knex('iti').select({               //select sth from 'iti'table
            id
        });
    }

    // get
    // set
    // delete
}
