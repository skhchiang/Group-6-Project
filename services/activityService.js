
const multer = require('multer');  
           // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files     
const path = require('path');

const upload = multer();

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

    upload(){

        function writeFile(name, body) {
            return (new Promise((resolve, reject) => {
                fs.writeFile(uploadDirectory + path.sep + name, body, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(name);
                });
            })).then(readFile);
        }
        
        function readFile(file) {
            return (new Promise((resolve, reject) => {
                fs.readFile(uploadDirectory + path.sep + file, (err, body) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    resolve(body);
                });
            }));
        }
        
        function readdir (path) {
            return new Promise((resolve,reject)=>{
                fs.readdir(path,(err,files)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(files);
                    }
                });
            });
        }





    }

}

module.exports = ActivityService;






