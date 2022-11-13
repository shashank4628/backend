const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const Approved = require('./models/approved');
// const techSecyprofileRoutes = require('./routes/techSecyprofile-routes');
const whatToDoRoutes = require('./routes/whatToDo');
const Purchase = require('./models/purchase');
const passportSetup = require('./config/passport-setup');
// const passportSetup1 = require('./config/passport-setup1');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport =require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
const ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');
app.use(cookieSession({
 maxAge: 24*60*60*1000,
 keys: ['sdfghjkl']
}));



app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://m001-student:m001-student-basics@sandbox.5jvgbpz.mongodb.net/?retryWrites=true&w=majority");
mongoose.connection.once('open', function(){
    console.log('Connection has been made, now make fireworks... Hello Shashank');
}).on('error', function(error){
    console.log('Connection error');
});

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// const handleDecline = (req, res) => {
//     const {id} = req.params;
//     Purchase.findByIdAndDelete(id)
//     .then(result => {
//         res.json({ redirect: '/techSecy/requests' });
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

// app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render("homepage.ejs")
});

app.get('/auth', (req, res) => {
    res.render("login.ejs", { user: req.user })
    });

app.use('/auth', authRoutes);
app.use('/auth/profile', profileRoutes);
app.use('/auth/whatToDo', whatToDoRoutes);
// app.use('/auth', authRoutes);
// app.use('/auth/profile', profileRoutes);

// app.get('/auth', (req, res) => {
//     res.render("login.ejs", { user: req.user })
//     });
// const passportSetup1 = require('./config/passport-setup1');
app.get('/techSecy', (req, res) => {
    res.render("techSecy.ejs", { user: req.user })
    });

    
    // app.use('/techSecy/requests', techSecyprofileRoutes);

app.get('/updateStock', (req, res) => {
    res.render("updateStock.ejs")
    });

    app.post('/upload', (req,res) => {
        // console.log(req.file)
        console.log(req.body);
        const purchase = new Purchase(req.body);
        // upload(req,res,(err) => {
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         const purchase = new Purchase({
        //             clubName: req.body.name,
        //             imagePath1:{
        //                 data:req.file.filename,
        //                 contentType:'image/png'
        //             }
        //         })
                purchase.save()
                .then(()=> { 
                    console.log('saved'); 
                    res.redirect('/updateStock');
                    res.send("Updating Done")
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            app.get('/techSecy/requests', (req,res) => {
                Purchase.find().sort({createdAt: -1 })
                    .then((result) => {
                        res.render('requests', {requests: result});
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })


            app.delete('/techSecy/requests/:id', (req,res) => {
                // console.log("Code is running");
                const id =req.params.id; 
                Purchase.findByIdAndDelete(id)
                // console.log(id)
                // console.log("Code is running Smoothly")
                    .then(result => {
                        res.json({ redirect: '/techSecy/requests' });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
            
            app.post('/techSecy/approved', (req,res) => {
                const approved = new Approved(req.body);
                    approved.save()
                    .then(() => {
                        console.log('approved');
                        res.redirect('/techSecy/requests');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
            
            app.get('/techSecy/approved', (req,res) => {
                Approved.find().sort({createdAt: -1 })
                    .then((result) => {
                        res.render('approved', {approvedRequests: result});
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });


    app.get('/techSecy/requests/:id', (req, res) => {
        const id = req.params.id;
        Purchase.findById(id)
            .then(result => {
                res.render('details', {request: result});
            })
            .catch(err => {
                console.log(err);
            });
    })

app.listen('3000', () => {
    console.log('Server is running on port 3000');
});