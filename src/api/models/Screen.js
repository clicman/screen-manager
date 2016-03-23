var mongoose = require('../mongo');

/**
 * Screen dcoument model
 */
var Screen = mongoose.model('Screen', {
    name: { type: String, unique: true },
    host: String,
    domain: String,
    login: String,
    password: String,
    reconnectEnabled: Boolean
});
module.exports = Screen;