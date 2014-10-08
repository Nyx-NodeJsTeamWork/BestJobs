'use strict';
var JobOffer = require('mongoose').model('JobOffer');

module.exports = {
    getAllJobOffers: function (req, res, next) {
        JobOffer.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Job offers could not be loaded: ' + err);
            }

            res.send(collection);
        });
    },
    getJobOfferById: function (req, res, next) {
        JobOffer.findOne({ _id: req.params.id }).exec(function (err, course) {
            if (err) {
                console.log('Job offer could not be loaded: ' + err);
            }

            res.send(course);
        });
    }
};