var mongoose = require('screen-model');
var mongoose = require('express');
var app = express();                               // create our app w/ express

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all screens
app.get('/api/screens', function (req, res) {

    // use mongoose to get all todos in the database
    Screen.find(function (err, screens) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(screens); // return all todos in JSON format
    });
});