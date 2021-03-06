const express = require("express");

class BuilderRouter {
  constructor(builderService) {
    this.builderService = builderService;
  }

  route() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));

    return router;
  }

  get(req, res) {
    console.log(req.query);

    return this.builderService
      .search(req.query.cities, req.query.typeOfActivities)
      .then((arr) => res.json(arr))
      .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    return this.builderService
      .create(req.body, req.user)
      .then(arr => {
        res.json({ status: "success" });
      })
      .catch(err => {
        console.log("post err", err); 
        res.status(500).json({ status: "failed" })
      });
  }
}

    
    
    module.exports = BuilderRouter;