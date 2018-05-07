const express = require('express');
const app = express();
const session = require('express-session');
const setupPassport = require('./passport');
const bodyParser = require('body-parser');
const router = require('./router')(express);
const port = process.env.PORT || 3030;

// Import Routers
const ItiRouter = require('./routers/itiRouter');
// Import Services
const ItiService = require('./services/itiService');

app.use(session({
    secret: 'supersecret'
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.use(bodyParser());

setupPassport(app);

app.use('/', router);                       //'/'is used as mother route and app.use to use router.get,post.delete... to control the  subsidiary route
let itiService = new ItiService(knex);
let itiRouter = new ItiRouter(itiService);
app.use('/iti', itiRouter.route());               // at route /iti, will call itRouter's route()method



app.listen(port);
console.log('listening on port ', port);