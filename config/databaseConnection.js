
const mongo = require('mongodb');
const mongoose = require('mongoose');

// Internal dependencies
var config = require("../config/config.js");
var envConfig = config.environmentConfig();

mongoose.Promise = Promise;
var connectToMongo = function () {
    // Connect to DB
    var mongoURL = envConfig.dbConnectionString;
    mongoose.connect(mongoURL, {
           useNewUrlParser: true,
          useCreateIndex : true,
          useUnifiedTopology: true
    });
    db = mongoose.connection;
    db.on('error', function onError(err) {
        console.log('Connection to Mongo Unsuccessful: ' + err);
    });

    // When the connection is disconnected
    db.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // When successfully connected
    db.on('connected', function () {
        console.log('Mongoose default connection open');
    });

    db.once('open', function callback() {
        console.log('Connection to Mongo Successful');
    });
};

//Mongoose Connection
module.exports.db = mongoose.connection;
module.exports.connectToMongo = connectToMongo;