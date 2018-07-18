const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
const setupPassport = require("./passport");
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const https = require("https");
const router = require("./router")(express);
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("express-handlebars");
const knexConfig = require("./knexfile")["development"];
const knex = require("knex")(knexConfig);

const BuilderRouter = require("./routers/builderRouter");
const ResultRouter = require("./routers/resultRouter");
const ActivityRouter = require("./routers/activityRouter");
const ProfileRouter = require ("./routers/profileRouter");
const RatingRouter = require ("./routers/ratingRouter");

const BuilderService = require("./services/builderService");
const ResultService = require("./services/resultService");
const ActivityService = require("./services/activityService");
const ProfileService = require ("./services/profileService");
const RatingService = require ("./services/ratingService");

//Set HANDLEBARS View Engine
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts"
  })
);
app.set("view engine", "hbs");
app.set("partials", path.join(__dirname, "/views/partials"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(
  session({
    secret: "supersecret",
    resave: true,
    saveUninitialized: true
  })
);



//comment

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setupPassport(app, knex);

app.use("/", router);

let builderService = new BuilderService(knex);
let builderRouter = new BuilderRouter(builderService);
let resultService = new ResultService(knex);
let resultRouter = new ResultRouter(resultService);
let activityService = new ActivityService(knex);
let activityRouter = new ActivityRouter(activityService, knex);
let profileService = new ProfileService(knex);
let profileRouter = new ProfileRouter(profileService);
// let ratingService = new RatingService(knex);
// let ratingRouter = new RatingRouter(ratingService);

app.use("/api/builder", builderRouter.route());
app.use("/api/profile", profileRouter.route());
// app.use("/api/rating", ratingRouter.route());
app.use('/api/result',resultRouter.route());
app.use('/api/activity', activityRouter.route());

//Render layout and views according to entered page, make data available 
app.get('/', function (req, res) {
    res.render('index', {
       
    });
});

app.get("/profile", function(req, res) {
  res.render("profile", {
  });
});

app.get("/builder", function(req, res) {
  res.render("builder", {
  });
});

app.get("/signup", function(req, res) {
    res.render("signup", {
    });
  });

  app.get("/login", function(req, res) {
    res.render("login", {
    });
  });

  app.get("/activity", function(req, res) {
    res.render("activity", {
    });
  });

app.set("port", 3000);

https
  .createServer(
    {
      key: fs.readFileSync(path.join(__dirname, "domain.key")),
      cert: fs.readFileSync(path.join(__dirname, "domain.crt"))
    },
    app
  )

  .listen(app.get("port"), function() {
    console.log("Server is listening on port " + app.get("port"));
  });
