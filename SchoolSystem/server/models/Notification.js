'use strict';
var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        require: '{PATH} is required',
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        require: '{PATH} is required',
        ref: 'User'
    },
    message: String
});

var Notification = mongoose.model('Notification', notificationSchema);