const express = require('express');


class BuilderRouter {

    constructor(builderService) {  
              
        this.builderService = builderService;                   
    }                                                               
                                                                    
        route() {
            let router = express.Router();
    
            router.get('/builder/:id', this.get.bind(this));
          

            return router;
        }
    
        get(req, res) {
            return this.builderService.list(req.params.id)
                .then((arr) => res.json(arr))
                .catch((err) => res.status(500).json(err));
        }
    
    }
    
    module.exports = BuilderRouter;

// router.get("/activity/:id",(req,res)=>{
//     return this.knex('activities')
//     .select('*')
//     .where('id',req.params.id)
//     .then((arr)=>{
//         res.json(arr);
//     })
//     .catch(err=>{
//         res.status(500).send(err);
//     });

// });