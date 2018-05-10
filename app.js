const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
const setupPassport = require("./passport");
const bodyParser = require("body-parser");
const knex = require("knex");
const http = require("http").Server(app);
const https = require("https");
const router = require("./router")(express);
const port = process.env.PORT || 3030;

// Import Routers
const ItiRouter = require("./routers/itiRouter");
// Import Services
const ItiService = require("./services/itiService");

app.use(
  session({
    secret: "supersecret",
    resave: true,
    saveUninitialized: true
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.use(bodyParser.urlencoded({ extended: false }));

setupPassport(app);

app.use("/", router); //'/'is used as mother route and app.use to use router.get,post.delete... to control the  subsidiary route
let itiService = new ItiService(knex);
let itiRouter = new ItiRouter(itiService);
app.use("/iti", itiRouter.route()); // at route /iti, will call itRouter's route()method

https
  .createServer(
    {
      key: fs.readFileSync("domain.key"),
      cert: fs.readFileSync("domain.crt")
    },
    app
  )
  .listen(port);
