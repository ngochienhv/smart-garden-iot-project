const dbConnection = require('../dbInstance');

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
    console.log("abc");
    console.log(req.body);
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
}