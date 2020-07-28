"use strict";

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var plugin = require('mongoose-timestamp');

var users = new Schema({
    userEmail: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String
    },
    fName: {
        type: String,
        trim: true
    },
    lName: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    }

})

users.plugin(plugin);
module.exports.users = mongoose.model('users', users, 'users');