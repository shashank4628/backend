const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');


const User = require('../models/user-model');
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
    done(null, user);
    }); 
});
passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: '570161755712-69i2j9qusq261ij4m6f69hht80rsvkpe.apps.googleusercontent.com',
        clientSecret: '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'
        // options for the google strategy
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                console.log('User is: ', currentUser);
                done(null, currentUser);
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    console.log('New user created: ' + newUser);
                    done(null, newUser);
                });
            }
        })
        // new User({
        //     username: profile.displayName,
        //     googleId: profile.id
        // }).save().then((newUser) => {
        //     console.log('new user created: ', newUser);
        // });
    }) 
);