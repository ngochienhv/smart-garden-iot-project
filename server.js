var express = require('express'); //Line 1
const http = require("http");
const mqttClient = require("./model/mqttConnection/mqttConnection");
const dbConnection = require("./model/dbInstance");
var app = express();
const server = http.createServer(app);
var port = process.env.PORT || 5000; //Line 3
var notiRoute = require('./controller/routes/notiRoutes');
var deviceRoute = require('./controller/routes/deviceRoutes');
var cors = require('cors');
var axios = require('axios');
var transporter = require('./model/email/emailSender');
app.use(cors());

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});

socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
    console.log("New client connected " + socket.id);

    socket.on("sendDataClient", function (data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
        socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
});

// This displays message that the server running and listening to specified port
server.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.use('/noti', notiRoute);
app.use('/device', deviceRoute);

let tempLimit;
let soilLimit;
let humiLimit;
let lightLimit;

axios.get('https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-temp-limit/data/retain')
    .then((res) => {
        tempLimit = res.data.split(',')[0];
    })

axios.get('https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-humi-limit/data/retain')
    .then((res) => {
        humiLimit = res.data.split(',')[0];
    })

axios.get('https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-soil-limit/data/retain')
    .then((res) => {
        soilLimit = res.data.split(',')[0];
    })

axios.get('https://io.adafruit.com/api/v2/ngochienhv/feeds/bbc-light-limit/data/retain')
    .then((res) => {
        lightLimit = res.data.split(',')[0];
    })

mqttClient.on("message", (topic, message) => {
    const value = parseInt(message.toString());
    switch (topic.split("/")[2]) {
        case "bbc-temp-limit":
            tempLimit = value;
            break;
        case "bbc-humi-limit":
            humiLimit = value;
            break;
        case "bbc-light-limit":
            lightLimit = value;
            break;
        case "bbc-soil-limit":
            soilLimit = value;
            break;
        default:
            break;
    }
});
mqttClient.on("message", (topic, message) => {
    const value = parseInt(message.toString());
    var id_sensor;
    var content = "";
    var subject = "";
    var table = "";
    switch (topic.split("/")[2]) {
        case "bbc-temp":
            id_sensor = 1;
            table = "temp";
            if (value > tempLimit) {
                content = "Temperature is too high! " + value.toString();
                subject = "High Temperature"
            }
            break;
        case "bbc-humi":
            id_sensor = 2;
            table = "humid";
            if (value < humiLimit) {
                content = "Humidity level is too low! " + value.toString();
                subject = "Low Humidity"
            }
            break;
        case "bbc-soil":
            table = "soilmoisture";
            id_sensor = 3;
            if (value < soilLimit) {
                content = "Soil moisture is too low! " + value.toString();
                subject = "Low Moisture"
            }
            break;
        case "bbc-light":
            table = "lightsensor";
            id_sensor = 4;
            if (value > lightLimit) {
                content = "Light level is too high! " + value.toString();
                subject = "High Light Level"
            }
            break;
        default:
            break;
    }
    const seen = "0";
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
    const query1 = `INSERT INTO ${table} (
        ID_SENSOR,
        value,
        mesureTime
    ) VALUES (
        '${id_sensor}',
        '${value}',
        '${measureTime}'
    )`;
    if (table != "") {
        try {
            dbConnection.query(query1, (err, results) => {
                if (err === null) {
                    console.log("Insert into " + table + " successfully!");
                }
            });
        } catch (err) {
            console.log("ERROR: " + err);
        }
    }
    if (content !== "") {
        try {
            dbConnection.query(query, (err, results) => {
                if (err === null) {
                    console.log("Inserted into notification successfully!");
                }
            });
        } catch (err) {
            console.log("ERROR: " + err);
        }
        socketIo.emit("newNoti", content);

        var mailOptions = {
            from: 'ngochien123hv@gmail.com',
            to: 'ngochien20032001@gmail.com',
            subject: subject,
            html: `<h1>${content}</h1>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
});