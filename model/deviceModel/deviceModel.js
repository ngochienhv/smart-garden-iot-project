const dbConnection = require('../dbInstance');
const mqttClient = require('../mqttConnection/mqttConnection');

mqttClient.on('message', (topic, message) => {
    var curDate = new Date();
    var curTime = curDate.getFullYear()+'-'+parseInt(curDate.getMonth() + 1).toString()+'-'+curDate.getDate()+' '+curDate.getHours() + ":" + curDate.getMinutes() + ":" + curDate.getSeconds();
    if(topic.split('/')[2] === 'bbc-pump')
    {
        var pumpEvent = parseInt(message.toString()) === 2 ? "On" : "Off";
        var level = 100;
        const query = `INSERT INTO minipump (pump_event, pump_time, level) VALUES ('${pumpEvent}', '${curTime}', '${level}')`;
        try {
            dbConnection.query(query, (err, results) => {
                if(err === null)
                {
                    console.log("Inserted to minipump successfully!");
                }
            });
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }
    else if(topic.split('/')[2] === 'bbc-led')
    {
        var lightEvent = parseInt(message.toString()) === 1 ? "On" : "Off";
        const query = `INSERT INTO light (light_event, light_time) VALUES ('${lightEvent}', '${curTime}')`;
        try {
            dbConnection.query(query, (err, results) => {
                if(err === null)
                {
                    console.log("Inserted to light successfully!");
                }
            });
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }
});    


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