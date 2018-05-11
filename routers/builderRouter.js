const express = require('express');


class BuilderRouter {

    constructor(builderService) {  
              
        this.builderService = builderService;                   
    }                                                               
                                                                    
        route() {
            let router = express.Router();
    
            router.get('/builder/:id', this.getById.bind(this));
            router.get('/builder',this.get.bind(this));
          

            return router;
        }
    
        getById(req, res) {
            return this.builderService.list(req.params.id)
                .then((arr) => res.json(arr))
                .catch((err) => res.status(500).json(err));
        }


        // builder?city=Hong KOng&type=Muesum
        get(req,res){
            console.log(req.query);
            //req.query = {city: Hong KOng, type: Muesum}
            //req.query.city

            return res.json({stsaus: 'success'})
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