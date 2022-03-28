var noti = require('../../model/notiModel/notiModel');

exports.getNoti = function (req, res) {
    noti.getNotiModel(req, res);
}

exports.deleteNoti = function (req, res) {
    noti.deleteNotiModel(req, res);
}