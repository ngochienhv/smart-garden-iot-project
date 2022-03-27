const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const DBSingleton = require('../model/dbSingleton');

var cors = require('cors')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(cors())

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

const db1 = DBSingleton.getInstance();
db1.connect();
const db1Connection = db1.getConn();

// create a GET route
app.get('/', (req, res) => {
    const query = `SELECT * FROM notification`;
    try {
        db1Connection.query(query, (err, results) => {
            res.status(200).send(results);
        });
    } catch (err) {
        console.log("ERROR: " + err);
        res.send("FAILED");
    }
});

app.delete('/', jsonParser, (req, res) => {
    console.log("abc");
    console.log(req.body);
    const id = req.body.id;
    const query = `DELETE FROM notification WHERE ID_DATA = '${id}'`;
    try {
        db1Connection.query(query, [id], (err, results) => {
            res.status(200).send("OK");
        });
    } catch (err) {
        console.log("ERROR: " + err);
        res.send("FAILED");
    }
});