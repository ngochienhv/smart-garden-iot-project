const dbConnection = require("../dbInstance");
const mqttClient = require("../mqttConnection/mqttConnection");

mqttClient.on("message", (topic, message) => {
    const value = parseInt(message.toString());
    var id_sensor;
    var content = "";
    switch (topic.split("/")[2]) {
        case "bbc-temp":
            id_sensor = 1;
            if (value > 35) {
                content = "Temperature is too high! " + value.toString();
            } else if (value < 10) {
                content = "Temperature is too low! " + value.toString();
            }
            break;
        case "bbc-humi":
            id_sensor = 2;
            if (value < 20) {
                content = "Humidity level is too low! " + value.toString();
            }
            break;
        case "bbc-soil":
            id_sensor = 3;
            if (value < 5) {
                content = "Soil moisture is too low! " + value.toString();
            }
            break;
        case "bbc-light":
            id_sensor = 4;
            if (value > 50) {
                content = "Light level is too high! " + value.toString();
            }
            break;
        default:
            break;
    }
    const seen = '0';
    var curDate = new Date();
    const measureTime =
        curDate.getFullYear() +
        "-" +
        parseInt(curDate.getMonth() + 1).toString() +
        "-" +
        curDate.getDate() +
        " " +
        curDate.getHours() +
        ":" +
        curDate.getMinutes() +
        ":" +
        curDate.getSeconds();
    const query = `INSERT INTO notification (
        ID_DATA,
        ID_SENSOR,
        notified,
        Seen,
        mesureTime
      ) VALUES (
          '${id_sensor}',
          '${content}',
          '${seen}',
          '${measureTime}'
      )`;
    if (content !== "") {
        try {
            dbConnection.query(query, (err, results) => {
                console.log(err);
            });
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }
});

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
