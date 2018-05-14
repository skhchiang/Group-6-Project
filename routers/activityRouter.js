const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: '../files' });


class ActivityRouter {


  constructor(activityService, knex) {
    this.uploadDirectory = path.join(__dirname, '../', "files");
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

  // post(req, res) {
  //   console.log(req.body, req.user);
  //   return this.activityService
  //     .make(req.body, req.user)
  //     .then(data => res.status(200).json({ data: data }))
  //     .catch(err => res.status(500).json(err));
  // }

  get(req, res) {
    res.render("activity", {});
  }

  // post(req, res){
  //   console.log(req.body);
  //   res.json({status: 'success'});c
  // }


  add(req, res) {
    console.log(req.body, req.file)
    this.writeFile(req.file.originalname, req.file.buffer)
      .then((pathName)=>{
        console.log("path:", pathName)
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
                photo:pathName,
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
          }
          else {
            console.log(pathName)
            resolve (pathName);
          }return pathName;
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
