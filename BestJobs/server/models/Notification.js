'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var notificationSchema = mongoose.Schema({
    sender: {
        type: Schema.Types.ObjectId,
        require: '{PATH} is required',
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        require: '{PATH} is required',
        ref: 'User'
    },
    message: String
});

var Notification = mongoose.model('Notification', notificationSchema);