const dbConnection = require('../dbInstance');

exports.getMinipumpModel = function (req, res) {
    const query = `SELECT * FROM minipump`;
    try {
        dbConnection.query(query, (err, results) => {
            res.status(200).send(results);
        });
    } catch (err) {
        console.log("ERROR: " + err);
        res.send("FAILED");
    }
}

exports.getLightModel = function (req, res) {
    const query = `SELECT * FROM light`;
    try {
        dbConnection.query(query, (err, results) => {
            res.status(200).send(results);
        });
    } catch (err) {
        console.log("ERROR: " + err);
        res.send("FAILED");
    }
}