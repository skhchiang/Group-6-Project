const fs = require("fs");

fs.readFile("./output.json", "utf-8", function read(err, data) {
  if (err) {
    throw err;
  }

//   console.log(JSON.parse(data)[1]);

  for (var i = 0; i < JSON.parse(data).length; i++) {
    JSON.parse(data).push({
      is_active: true
    });
  }

  fs.writeFile("output2.json", data, function(err) {
    console.log("File written");
  });
});

