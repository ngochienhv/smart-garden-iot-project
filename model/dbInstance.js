const DBSingleton = require('../model/dbSingleton');

const db = DBSingleton.getInstance();
db.connect();
const dbConnection = db.getConn();

module.exports = dbConnection;
