const device = require('../../model/deviceModel/deviceModel');

exports.getMinipump = function (req, res) {
    device.getMinipumpModel(req, res);
}

exports.getLight = function (req, res) {
    device.getLightModel(req, res);
}