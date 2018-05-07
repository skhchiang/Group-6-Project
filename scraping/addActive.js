const fs = require ("fs");

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
  
    console.log(attractionTypesObjectArray);
    fs.writeFile("attractionTypeList.json", JSON.stringify(attractionTypesObjectArray), function(err) {
      console.log("File written");
    });
  });