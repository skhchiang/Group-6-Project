const express = require("express");

class ProfileRouter {
  constructor(profileService) {
    this.profileService = profileService;
  }

  route() {
    let router = express.Router();

    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));

    return router;
  }

  get(){

  }

  post(){
      
  }





  
}

    
    
    module.exports = ProfileRouter;
