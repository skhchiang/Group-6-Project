const express = require('express');


class ResultRouter {

    constructor(resultService) {  
        this.resultService = resultService;                   
    }                                                               
                                                                    
        route() {
        
            let router = express.Router();
            router.get('/',this.get.bind(this));
            router.post('/',this.post.bind(this));
            return router;
        }
    

        get(req,res){
            console.log(req.query);

            return this.resultService.result(req.query.cities,req.query.typeOfActivities)
                .then((arr) => res.json(arr))
                .catch((err) => res.status(500).json(err));
        }

        post(req,res){
    
            return this.resultService.save(req.user,req.body)
            .then((data) => {console.log("data", data) 
            res.json({data: data})
            })
            .catch((err) => res.status(500).json(err));
    }
        
    }
    
    module.exports = ResultRouter;
