var noti = require('../../model/notiModel/notiModel');

exports.getNoti = function (req, res) {
    noti.getNotiModel(req, res);
}

exports.deleteNoti = function (req, res) {
    noti.deleteNotiModel(req, res);
}

exports.countNoti = function (req, res) {
    noti.countNotiModel(req, res);
}

exports.markAsRead = function (req, res) {
    noti.markAsReadModel(req, res);
}