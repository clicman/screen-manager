var mongoose = require('mongoose');        

// define model =================
var Screen = mongoose.model('Screen', {
    name: String,
    host: String,
    domain: String,
    login: String,
    password: String,
    reconnectEnabled: Boolean
});