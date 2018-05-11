const express = require('express');

class ItiRouter {
    constructor(itiService) {                     // before constructor, there should be let itService = null? and this.itiService is getting the itiService variable
        this.itiService = itiService;                    // this.itiService is getting the itiService variable
    }                                                            // *** when within the class ItiRouter, all the itiService need to be this.itiService    
                                                                       // which means itiService within this class
    route() {
        let router = express.Router();
        router.get('/', this.get.bind(this));
        return router;
    }

    get(req, res) {
        return this.itiService.list()
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json({status: "failed", exception: exception.message}));
    }
    // async get(req, res) {
    //     try {
    //         let data = await this.itiService.list();  
    //         console.log(data);
    //         return res.json({data: data})
    //     } catch (exception) {                                
    //         return res.json({status: "failed", exception: exception});
    //     }
    // }
}

module.exports = ItiRouter;