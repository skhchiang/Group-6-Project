//passport.js
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('./bcrypt');
const express = require ('express');
const session = require ('express-session');
const https = require ('https');
const app = express();


const LocalStrategy = require('passport-local').Strategy;
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: process.env.DB_NAME,
        user:     process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
});

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local-login', new LocalStrategy(
        async (email, password, done) => {
            try{
                let users = await knex('users').where({email:email})

                    if (users.length == 0) {
                        return done(null, false, { message: 'Incorrect credentials.' });
                    }
                    let user=users[0];
                    let result = await bcrypt.checkPassword(password, user.password);
                    if(result){
                        return done(null,user);
                    }else{
                        return done(null,false,{message:'Incorrect credentials'});
                    }
                
            }catch(err){
                return done(err);
            }
        }
    ));

    passport.use('another-strategy', new FacebookStrategy({
        clientID: '168428157188487',
        clientSecret: '2f4936e64fc79f559f9c2bfc8219737b',
        callbackURL: `/auth/facebook/callback`
    },async (accessToken, refreshToken, profile, done)=>{
        //check whethter this facebook user is alreadyour member
        //-> check whether we have the facebookId (saved within profile)
        //  linked in any of our users
        // in user database, set fbid as "unique unsigned int /string"
        // if checked the fbid is found in the user DB, return the user
        // if no, create a user, and then return the user

        try{
            let users = await knex('users').where({fbid:profile.id})
            let user = users.find(u=> u.fbid===profile.id);
            if(user){
                //you might put accessToken to the users database
                done(null,user);
            }else{
                 const newUser = {
            
                    id: users.length + 1,
                    name:undefined,
                    email:undefined,
                    password: undefined,
                    fbid:profile.id
                 };
                 knex ('users').insert (newUser)
                 .then((user)=>{
                done(null,user);
             })
            }
            }catch(err){
            done(err);
        }

    })
);


    passport.use('local-signup', new LocalStrategy(
        async (email, password, done) => {
            
            try{
                let users = await knex('users').where({email:email});
                if (users.length > 0) {
                    return done(null, false, { message: 'Email already taken' });
                }
                console.log(email)
                console.log(password);
                let hash = await bcrypt.hashPassword(password)
                   console.log(hash);
                const newUser = {
                    email:email,
                    password: hash,
                    id: users.length + 1,
                    fbid:undefined,
                    is_active:undefined

                };
                let userId = await knex('users').insert(newUser).returning('id');
                done(null,newUser);
             
            }catch(err){
                done(err);
            }
    
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        let users = await knex('users').where({id:id});
        if (users.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = users[0];
        return done(null, user);
    });
};

