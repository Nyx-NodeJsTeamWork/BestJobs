'use strict';
var Company = require('mongoose').model('Company');

module.exports = {
    getAllCompanies: function (req, res, next) {
        Company.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Companies could not be loaded: ' + err);
            }

            res.send(collection);
        });
    },
    getCompanyById: function (req, res, next) {
        Company.findOne({ _id: req.params.id }).exec(function (err, course) {
            if (err) {
                console.log('Company could not be loaded: ' + err);
            }

            res.send(course);
        });
    }
};