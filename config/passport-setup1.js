// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');


// const User = require('../models/user-model');
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id).then((user) => {
//     done(null, user);
//     }); 
// });
// passport.use(
//     new GoogleStrategy({
//         callbackURL: '/techSecy/google/redirect',
//         clientID: '15214731552-hpv6lih39n4q9ilo146oov74aoqqcanh.apps.googleusercontent.com',
//         clientSecret: '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'
//         // options for the google strategy
//     }, (accessToken, refreshToken, profile, done) => {
//         User.findOne({googleId: profile.id}).then((currentUser) => {
//             if(currentUser){
//                 console.log('User is: ', currentUser);
//                 done(null, currentUser);
//             } else {
//                 new User({
//                     username: profile.displayName,
//                     googleId: profile.id,
//                     thumbnail: profile._json.picture
//                 }).save().then((newUser) => {
//                     console.log('New user created: ' + newUser);
//                     done(null, newUser);
//                 });
//             }
//         })
//         // new User({
//         //     username: profile.displayName,
//         //     googleId: profile.id
//         // }).save().then((newUser) => {
//         //     console.log('new user created: ', newUser);
//         // });
//     }) 
// );