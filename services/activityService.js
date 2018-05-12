
const multer = require('multer');  
           // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files     
const path = require('path');



const uploadDirectory = __dirname + path.sep + 'files';


class ActivityService {

    constructor(knex){
        
         this.knex = knex;         //class BuilderService use knex !!
        
    }
                                   

    make(body) {

         var subquery1 = this.knex.select('id').from('cities').where('name',body.city)
            var subquery2 = this.knex.select('id').from('typeOfActivities').where('name',body.typeOfActivities)

            return this.knex('activities')
            .insert({
                 name:body.name,
                 address:body.address,
                 description:body.description,
                 photo:body.URL,
                 reviewing_status:false,
                 typeOfActivities_id:subquery1,
                 cities_id:subquery2,
                 is_active:true
            })
         
    }

}

module.exports = ActivityService;






