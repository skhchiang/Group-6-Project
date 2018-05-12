const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer();
const UploadDirectory = __dirname + path.sep + "files";

class ActivityRouter {
  constructor(activityService) {
    this.activityService = activityService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    // router.postUpload("/upload", upload.single('file'), this.post.bind(this));
    return router;
  }

  post(req, res) {
    console.log(req.body, req.user);
    return this.activityService
      .make(req.body, req.user)
      .then(data => res.status(200).json({ data: data }))
      .catch(err => res.status(500).json(err));
  }

  // postUpload(req, res) {
  //   console.log(req.body, req.user);
  //   writeFile(req.file.originalname, req.file.buffer)
  //     .then(() => res.status(200).send(uploadDirectory + path.sep + name))
  //     .catch(err => res.status(500).json(err));
  // }
}

function writeFile(name, body) {
  return new Promise((resolve, reject) => {
    fs.writeFile(uploadDirectory + path.sep + name, body, err => {
      if (err) {
        return reject(err);
      }
      resolve(name);
    });
  }).then(readFile);
}

module.exports = ActivityRouter;
