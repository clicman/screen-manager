// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


// configuration =================

mongoose.connect('mongodb://node:admin:root,fypfq@clicman.ru:27017/screen-manager');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
// app.use(morgan('dev'));                                         // log every request to the console
// app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
// app.use(bodyParser.json());                                     // parse application/json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride());

// define model =================
var Screen = mongoose.model('Screen', {
    name: String,
    host: String,
    domain: String,
    login: String,
    password: String,
    reconnectEnabled: Boolean
});


// routes ======================================================================

// api ---------------------------------------------------------------------
// get all screens
app.get('/api/screens', function (req, res) {

    // use mongoose to get all screens in the database
    Screen.find(function (err, screens) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(screens); // return all todos in JSON format
    });
});

// create screen
app.post('/api/screens', function (req, res) {

    // create a screen, information comes from AJAX request from Angular
    Screen.create({
        name: req.body.name,
        host: req.body.host,
        domain: req.body.domain,
        login: req.body.login,
        password: req.body.password,
        reconnectEnabled: true
    }, function (err, todo) {
        if (err)
            res.send(err);
    });

});

// delete a screen
app.delete('/api/screens/:screen_id', function (req, res) {
    Screen.remove({
        _id: req.params.screen_id
    }, function (err, todo) {
        if (err)
            res.send(err);
    });
});

app.get('/api/screens/start/:screen_id', function (req, res) {

    Screen.find({
        _id: req.params.screen_id
    }, function (err, screen) {
        if (err) {
            return res.send(err);
        }
        var exec = require('child_process').exec;
        exec(`echo ${screen.name}`, function (error, stdout, stderr) {
            if (stderr !== null && stderr.length !== 0) {
                console.log("==>" + stderr + "<==");
                return res.send(stderr);
            }
            if (stdout !== null) {
                return res.send(stdout);
            }
            if (error !== null) {
                return res.send(error);
            }
        });
    });

});




// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
