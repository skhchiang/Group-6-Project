const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.memoryStorage()
const upload = multer({ dest: '../public/images', storage: storage });


class ActivityRouter {


  constructor(activityService, knex) {
    this.uploadDirectory = path.join(__dirname, '../', "public", "images");
    this.activityService = activityService;
    this.knex = knex;
  }

  route() {
    let router = express.Router();
    // router.post("/", this.post.bind(this));
    router.get("/", this.get.bind(this));
    router.post("/upload", upload.single('profile'), this.add.bind(this));
    return router;
  }

  get(req, res) {
    res.render("activity", {});
  }

 
  add(req, res) {
    console.log(req.body, "req.file", req.file.buffer)
    this.writeFile(req.file.originalname, req.file.buffer)
      .then((fileName)=>{
        console.log("fileName:", fileName)
        this.knex
          .first("id")
          .from("cities")
          .where("name", req.body.cities)
          .then((city)=> {
            this.knex
            .first("id")
            .from("typeOfActivities")
            .where("name", req.body.typeOfActivities)
            .then((type)=>{
              console.log("city.id", city.id, "type.id", type.id);
              return this.knex("activities").insert({
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                photo: `images/${fileName}`,
                reviewing_status: false,
                typeOfActivities_id: type.id,
                cities_id: city.id,
                is_active: true
              });
            });
        });
      })
      .then((pathName) => {
         res.redirect('/')
        // res.json({path: pathName,name:req.body.name,description:req.body.description,address:req.body.address,typeOfActivities:req.body.typeOfActivities,cities:req.body.cities})
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }


  writeFile(name, body) {
    console.log("writeFile Buffer", body);
    return new Promise((resolve, reject) => {
      const pathName = path.join(this.uploadDirectory, name);
      fs.writeFile(pathName, body, err => {
        if (err) {
          return reject(err);
        }
       // return this.knex("activities").insert({ photo: pathName}).then((result, err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(name)
            resolve (name);
          }
          //return pathName;
        });
      })
    };
  }

//   readFile(file) {
//     return (new Promise((resolve, reject) => {
//       fs.readFile(path.join(this.uploadDirectory, file), (err, body) => {
//         if (err) {
//           console.log(err);
//           return reject(err);
//         }
//         resolve(body);
//       });
//     }));
//   }
// }

module.exports = ActivityRouter;
