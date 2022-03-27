var mysql = require('mysql');
const dbinfo = require('./db');

let instance = null;

class DBSingleton {

    constructor() {
        this._conn = null;
    }

    connect() {
        if (this._conn === null) {
            console.log('Connnected!');
            this._conn = mysql.createPool(dbinfo);
        }
        else {
            console.log('Database already connected!');
        }
    }

    getConn() {
        return this._conn;
    }

    static getInstance() {
        if (!instance) {
            console.log(`Creating instance!`);
            instance = new DBSingleton();
        }
        else {
            console.log(`Instance is already created!`);
        }
        return instance;
    }
}

module.exports = DBSingleton;