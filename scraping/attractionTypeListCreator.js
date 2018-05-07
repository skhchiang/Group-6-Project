const fs = require("fs");
var content, attractions;
var attractionTypes =[];
var attractionTypesObjectArray = [];

fs.readFile("./output.json", "utf-8", function read(err, data) {
  if (err) {
    throw err;
  }

  for (var i = 0; i < JSON.parse(data).length; i++) {
    attractions = JSON.parse(data)[i].type;
    attractionTypes.indexOf(attractions) === -1
      ? attractionTypes.push(attractions)
      : null;
  }

  for (var x = 0; x < attractionTypes.length; x++) {
    attractionTypesObjectArray.push({typeOfActivities: attractionTypes[x], is_active: true});
  }

  console.log(attractionTypesObjectArray);
  fs.writeFile("attractionTypeList.json", JSON.stringify(attractionTypesObjectArray), function(err) {
    console.log("File written");
  });
});
