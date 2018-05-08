const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    }

    router.get('/profile',  isLoggedIn, (req, res) => {
        res.send(__dirname+'/profile.html');
    });

    router.get('/', (req, res) => {
        res.sendFile(__dirname + '/login.html');
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/index',
        failureRedirect: '/error'
    }));

    router.get('/error', (req, res) => {
        res.send('You are not logged in!');
    });

    router.get('/index', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    return router;
};