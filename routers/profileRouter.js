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
    console.log(req.user);
    return this.profileService
      .search(req.user)
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = ProfileRouter;
