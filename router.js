const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');
    }

    
    router.get('/login', (req, res) => {
        res.render("login", {
        });
    });

    router.get('/profile',  isLoggedIn, (req, res) => {
        res.render("profile", {
        });
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/error'
    }));

    router.get('/error', (req, res) => {
        res.send('You are not logged in!');
    });

    // router.get('/index', (req, res) => {
    //     res.sendFile(__dirname + '/index');
    // });

    router.get('/signup', (req, res) => {
        res.render("signup", {
        });

    router.get('/index', (req, res) => {
        res.render( );
    })});
    
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/error'
    }));


    router.get('/auth/facebook',
    passport.authenticate('another-strategy'));

    router.get('/auth/facebook/callback',
        passport.authenticate('another-strategy', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/profile');
        });

    return router;
};