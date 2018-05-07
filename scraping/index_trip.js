const express = require("express");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

app.get("/scrape", function(req, res) {
  url =
    "https://en.tripadvisor.com.hk/Attractions-g308272-Activities-c47-t17-Shanghai.html";

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var name, type, city, rating, picture;
      var attractionInfo = [];

      $("span.matchedTag.noTagImg").filter(function() {
        type = $(this)
          .text()
          .trim();
      });

      $("span.ui_pill.inverted").filter(function() {
        city = $(this)
          .text()
          .trim();
      });

      $("div.photo_booking.non_generic.photo_image").filter(function() {
        picture = $(this)
          .attr("src")
          .trim();
      });

      $("div.listing_details").each(function() {
        let data = $(this);
        name = data
          .children()
          .children()
          .children()
          .first()
          .text()
          .trim();

        rating = data
          .children()
          .children()
          .next("div.listing_rating")
          .children()
          .children()
          .children()
          .attr("alt");
        rating = rating.replace(/\b bubbles/gi, "");

        // picture = data
        //   .children()
        //   .eq(2)
        //   .next("a.photo_link")
        //   .find("img.photo_img")
        //   .attr("src");

        var results = {
          attractionName: name,
          attractionType: type,
          attractionCity: city,
          attractionRating: rating
        };
        attractionInfo.push(results);
      });
      attractionInfo = JSON.stringify(attractionInfo);
    }

    fs.writeFile("output.json", attractionInfo, function(err) {
      console.log("File written");
    });

    res.send("Check console");
  });
});

app.listen("8081");
console.log("load port 8081");
exports = module.exports = app;
