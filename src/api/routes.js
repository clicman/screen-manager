var Screen = require('./models/Screen');

/**
 * Api routes
 */
module.exports = app => {

    /**
     * Get all screens
     */
    app.get('/api/screens', function(req, res) {
        Screen.find(function(err, screens) {

            if (err)
                res.send(err)
            res.send(screens);
        });
    });

    /**
     * Get screen by id
     */
    app.get('/api/screens/:screen_id', function(req, res) {
        Screen.find({
            _id: req.params.screen_id
        }, function(err, screen) {

            if (err)
                res.send(err)
            res.send(screen);
        });
    });

    /**
     * Create screen
     */
    app.post('/api/screens', function(req, res) {
        Screen.create({
            name: req.body.name,
            host: req.body.host,
            domain: req.body.domain,
            login: req.body.login,
            password: req.body.password,
            reconnectEnabled: true
        }, function(err, screen) {
            if (err)
                res.send(err);
            res.send(screen);
        });

    });

    /**
     * Update screen
     */
    app.post('/api/screens/:screen_id', function(req, res) {
        Screen.update({
            _id: req.params.screen_id
        }, {
                host: req.body.host,
                domain: req.body.domain,
                login: req.body.login,
                password: req.body.password,
                reconnectEnabled: true
            }, function(err, screen) {
                if (err)
                    res.send(err);
                res.status(200).end();
            });

    });

    /**
     * Delete screen
     */
    app.delete('/api/screens/:screen_id', function(req, res) {
        Screen.remove({
            _id: req.params.screen_id
        }, function(err, screen) {
            if (err)
                res.send(err);
            res.status(200).end();
        });
        return;
    });

    /**
     * Start screen
     */
    app.get('/api/screens/start/:screen_id', function(req, res) {
        Screen.find({
            _id: req.params.screen_id
        }, function(err, screen) {
            if (err) {
                return res.send(err);
            }
            res.send(screen);
            var exec = require('child_process').exec;
            // exec(`echo ${screen.name}`, function(error, stdout, stderr) {
            //     if (stderr !== null && stderr.length !== 0) {
            //         console.log("==>" + stderr + "<==");
            //         return res.send(stderr);
            //     }
            //     if (stdout !== null) {
            //         return res.send(stdout);
            //     }
            //     if (error !== null) {
            //         return res.send(error);
            //     }
            // });
        });

    });
}