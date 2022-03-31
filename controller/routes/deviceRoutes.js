var express = require('express');
var router = express.Router();
var device = require('../deviceController/deviceController');

router.get('/minipump', device.getMinipump);

router.get('/light', device.getLight);

module.exports = router;