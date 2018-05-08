const fs = require("fs");
const newAttractionArray = [];
let attractions;

fs.readFile("./output.json", "utf-8", function read(err, data) {
  if (err) {
    throw err;
  }

  for (var i = 0; i < JSON.parse(data).length; i++) {
    attractions = JSON.parse(data)[i];
    attractions.is_active = true;
    newAttractionArray.push(attractions);
  }

  fs.writeFile("output2.json", JSON.stringify(newAttractionArray), function(err) {
    console.log("File written");
  });
});
