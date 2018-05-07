const fs = require ("fs");
var content;
fs.readFile('./output.json', 'utf-8', function read(err, data) {
    if (err) {
        throw err;
    }
    console.log(JSON.parse(data).length); 
});
