var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var notiController = require('../notiController/notiController');

router.get('/get', notiController.getNoti);

router.delete('/delete', jsonParser, notiController.deleteNoti);

router.get('/count', notiController.countNoti);

router.post('/update', jsonParser, notiController.markAsRead);

module.exports = router;