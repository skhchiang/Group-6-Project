// const express = require('express');

// class ItiRouter {

//     constructor(itiService) {                     // before constructor, there should be let itService = null? and this.itiService is getting the itiService variable
//         this.itiService = itiService;                    // this.itiService is getting the itiService variable
//     }                                                            // *** when within the class ItiRouter, all the itiService need to be this.itiService    
//                                                                        // which means itiService within this class
//     route() {

//         let router = express.Router();
//         // for searching
//         router.get('/', this.get.bind(this));
//         // add a iti
//         // router.post("/", this.post.bind(this));

//         // delete
//         //router.delete('/')

//         // update
//         //router.put('/')

//         // get by id
//         //router.get('/:id', this.getById);
//         return router;
//     }

    // async get(req, res) {
    //     try {
    //         let data = await this.itiService.list();           // add await because need to get data from .list Method before going on
    //         return res.json({data: data})
    //     } catch (exception) {                               //exception = e 
    //         return res.json({status: "failed"});
    //     }
    // }

//   async post(req, res) {
//     }

// }

// module.exports = ItiRouter;

// ItiRouter 
//  - itiService
//  - route(), get(), post()