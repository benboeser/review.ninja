var passport = require('passport');
var express = require('express');
var path = require('path');

//////////////////////////////////////////////////////////////////////////////////////////////
// User controller
//////////////////////////////////////////////////////////////////////////////////////////////

var router = express.Router();

router.get('/auth/github',
    function(req, res, next) {
        req.session.referer = req.headers.referer;
        var scope = req.query.private === 'true' ? config.server.github.private_scope : config.server.github.public_scope;
        passport.authenticate('github', {scope: scope})(req, res, next);
    }
);

router.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/'
    }),
    function(req, res) {
        var next = req.session.next || '/';
        req.session.next = null;
        res.redirect(next);
    }
);

router.get('/logout',
    function(req, res, next) {
        req.logout();
        res.redirect('/');
    }
);

module.exports = router;
