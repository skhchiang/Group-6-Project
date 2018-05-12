const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: '../files' });

class ActivityRouter {
  
  constructor(activityService) {
      this.uploadDirectory = path.join(__dirname, '../', "files");
    this.activityService = activityService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    router.get("/",this.get.bind(this));
    router.post("/upload", upload.single('profile'), this.upload.bind(this));
    return router;
  }

  post(req, res) {
    console.log(req.body, req.user);
    return this.activityService
      .make(req.body, req.user)
      .then(data => res.status(200).json({ data: data }))
      .catch(err => res.status(500).json(err));
  }

  get(req,res){
        res.sendFile(path.join(__dirname,'activity.html'));
  }

  upload(req, res) {
   this.writeFile(req.file.originalname, req.file.buffer)
      .then((pathName) =>{
          res.json({path: pathName})
        })
      .catch(err => res.status(500).json(err));
  }


 writeFile(name, body) {
  return new Promise((resolve, reject) => {
      const pathName = path.join(this.uploadDirectory, name);
    fs.writeFile(pathName, body, err => {
      if (err) {
        return reject(err);
      }
      resolve(pathName);
    });
  });
}

 readFile(file) {
    return (new Promise((resolve, reject) => {
        fs.readFile(path.join(this.uploadDirectory, file), (err, body) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(body);
        });
    }));
    }
}

module.exports = ActivityRouter;