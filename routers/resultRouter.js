const express = require("express");

class ResultRouter {
  constructor(resultService) {
    this.resultService = resultService;
  }

  route() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    return router;
  }

  get(req, res) {
    console.log(req.query);

    return this.resultService
      .results(req.query.cities, req.query.typeOfActivities)
      .then(arr => res.json(arr))
      .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    console.log(req.body, req.user);
    return this.resultService
      .save(req.body, req.user)
      .then(data => res.status(200).json({data: data}))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = ResultRouter;
