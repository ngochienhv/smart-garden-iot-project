const dbConnection = require("../dbInstance");
const mqttClient = require("../mqttConnection/mqttConnection");


exports.getNotiModel = function (req, res) {
    const query = `SELECT * FROM notification`;
    try {
        dbConnection.query(query, (err, results) => {
            res.status(200).send(results);
        });
    } catch (err) {
        console.log("ERROR: " + err);
        res.send("FAILED");
    }
};

exports.deleteNotiModel = function (req, res) {
    const id = req.body.id;
    const query = `DELETE FROM notification WHERE ID_DATA = '${id}'`;
    try {
        dbConnection.query(query, [id], (err, results) => {
            res.status(200).send("OK");
        });
    } catch (err) {
        console.log("ERROR: " + err);
        res.send("FAILED");
    }
};

exports.countNotiModel = function (req, res) {
    const query = `SELECT Seen, COUNT(*) as count FROM notification GROUP BY Seen`;
    try {
        dbConnection.query(query, (err, results) => {
            res.status(200).send(results);
        });
    } catch (err) {
        console.log("ERROR: " + err);
        res.send("FAILED");
    }
};

exports.markAsReadModel = function (req, res) {
    const id = req.body.id;
    const query = `UPDATE notification SET Seen = 1 WHERE ID_DATA = '${id}'`;
    try {
        dbConnection.query(query, [id], (err, results) => {
            res.status(200).send("OK");
        });
    } catch (err) {
        console.log("ERROR: " + err);
        res.send("FAILED");
    }
};
