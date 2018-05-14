const express = require("express");

class RatingRouter {
  constructor(ratingService) {
    this.ratingService = ratingService;
  }

  route() {
    let router = express.Router();

    router.get("/", this.get.bind(this));
    router.post("/rated", this.post.bind(this));

    return router;
  }

  get(req, res) {
    res.sendFile(path.join(__dirname, 'rating.html'));
  }

   post(req, res) {
    return this.ratingService
      .rate(req.body, req.user)
      .then(data => res.status(200).json({ data: data }))
      .catch(err => res.status(500).json(err));
  }
  
}

    
    
    module.exports = RatingRouter;
