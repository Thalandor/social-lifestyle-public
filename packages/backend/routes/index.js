var express = require('express');
var router = express.Router();

var LoginController = require('../controllers/login-controller')
var UserController = require('../controllers/user-controller')
var TipController = require('../controllers/tip-controller')
var FeedController = require('../controllers/feed-controller')

router.get('/users', UserController.getUsers)
router.post('/register', LoginController.register);
router.post('/login', LoginController.login);
router.post('/tipMeta', TipController.tipMetaTransaction);
router.post('/feed', FeedController.createFeed);
router.get('/feeds', FeedController.getFeeds);


module.exports = router;