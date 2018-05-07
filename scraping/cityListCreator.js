const fs = require("fs");
var content, cityName;
var cityList = [];

fs.readFile("./cities.json", "utf-8", function read(err, data) {
  if (err) {
    throw err;
  }

  for (var i = 0; i < JSON.parse(data).city.length; i++) {
    cityName = JSON.parse(data).city[i];
    cityName = cityName.replace("-", " ");
    cityName = cityName.replace(/\b\w/g, l => l.toUpperCase());
    cityList.push({
      name: cityName,
      is_active: true
    });
  }
  console.log(cityList);
  fs.writeFile("cityList.json", JSON.stringify(cityList), function(err) {
    console.log("File written");
  });
});
