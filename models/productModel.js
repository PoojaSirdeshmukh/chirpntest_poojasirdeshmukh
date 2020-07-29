"use strict";

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var plugin = require('mongoose-timestamp');

var product = new Schema({
   productName: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

product.plugin(plugin);
module.exports.product = mongoose.model('product', product, 'product');