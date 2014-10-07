'use strict';
var mongoose = require('mongoose');
var user = require('../models/User');
var company = require('../models/Company');
var jobCategory = require('../models/JobCategory');
var jobOffer = require('../models/JobOffer');
var notification = require('../models/Notification');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...');
    });

    db.on('error', function (err) {
        console.log('Database error: ' + err);
    });

    user.seedInitialUsers();
};