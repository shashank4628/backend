const router = require('express').Router();
const passport = require('passport');
// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
    
}));

// const authCheck = (req, res, next) => {
//     if(!req.user){
//         // if user is not logged in
//         res.redirect('/auth/login');
//     } else {
//         // if logged in
//         next();
//     }
// };

router.get('/google/redirect', passport.authenticate('google'),(req, res) => {
    // res.send(req.user);
    // res.redirect('/auth/profile/'); 
    // res.redirect('/auth/whatToDo');
    // console.log(req.user.googleId + " Hello World");
    if(req.user.googleId == '115677955019831879848'){
        res.redirect('/techSecy/requests');
    }
    else{
        res.redirect('/auth/whatToDo');
    }
    
});

module.exports = router;