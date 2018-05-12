const express = require('express');


class ActivitRouter {

    constructor(activityService) {  
              
        this.activityService = activityService;                   
    }                                                               
                                                                    
        route() {
            let router = express.Router();
    
            router.post('/',this.post.bind(this));
            router.postUpload('/',this.postUpload.bind(this));
          
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

        postUpload(req,res){
            console.log(req.body);
            return this.activityService
            .upload(req.body)
            .then(arr=> {
                res.json({status: "success"})
            })
            .catch(err => res.status(500).json({status: "failed"}));
        }
        
    }
    
    module.exports = ActivityRouter;
