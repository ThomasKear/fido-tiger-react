// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************
var env = process.env.NODE_ENV || 'development';

var creds = require("config.json")[env];

// Dependencies
var Sequelize = require("sequelize");


// Creates mySQL connection using Sequelize
if (process.env.JAWSDB_URL) {
    var sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    var sequelize = new Sequelize("fidoandtiger_db", "root", "root", {
        host: "localhost",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
}
// Exports the connection for other files to use
module.exports = sequelize;