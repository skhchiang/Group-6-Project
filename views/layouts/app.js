const express = require('express');
const app = express();
const hb = require('express-handlebars');

app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/itin', function(req, res){
    res.render('itinerary');
});


app.listen(8080);