var express = require('express'); //Line 1
var app = express(); //Line 2
var port = process.env.PORT || 5000; //Line 3

var notiRoute = require('./controller/routes/notiRoutes');
var deviceRoute = require('./controller/routes/deviceRoutes');
var cors = require('cors');
app.use(cors());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.use('/noti', notiRoute);
app.use('/device', deviceRoute);