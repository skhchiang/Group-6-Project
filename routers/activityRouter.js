const express = require('express');
const app = express();
const multer = require('multer');             // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files     
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


const upload = multer();
upload.single('file')
const uploadDirectory = __dirname + path.sep + 'files';


class ActivityRouter {

    constructor(activityService) {  
              
        this.activityService = activityService;                   
    }                                                               
                                                                    
        route() {
            let router = express.Router();
    
            router.post('/',this.post.bind(this));
            router.put('/uploaded',this.put.bind(this));
            router.get('/',this.get.bind(this));
          
            return router;
        }
    
        post(req,res){
            console.log(req.body);
            return this.activityService
            .make(req.body)
            .then(arr=> {
                res.json({status: "success"})
            })
            .catch(err => res.status(500).json({status: "failed"}));
        }

        get(req,res){
            res.sendFile(path.join(__dirname,'activity.html'));
        }
        

        put(req, res){
            console.log(req.body);

            caches[req.params.name] = writeFile(req.file.originalname, req.file.buffer);    // eg. cilent send a photo, write the photo to server and update the caches memory
            caches[req.params.name]                                                         // when have record in caches , send the response
                .then(() => res.send(__dirname + path.sep + 'files'))
                .catch((e) => res.status(500).send(e.message));
        }

        writeFile(name, body) {
            return (new Promise((resolve, reject) => {
                fs.writeFile(uploadDirectory + path.sep + name, body, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(name);
                });
            })).then(readFile);
        }
        
        readFile(file) {
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


        
    }
    
    module.exports = ActivityRouter;
