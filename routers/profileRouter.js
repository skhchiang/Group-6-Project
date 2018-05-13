const express = require("express");

class ProfileRouter {
  constructor(profileService) {
    this.profileService = profileService;
  }

  route() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    return router;
  }

  get(req, res) {
    return this.profileService  
      .search(req.user)
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));
      console.log(data);
  }
}

module.exports = ProfileRouter;
