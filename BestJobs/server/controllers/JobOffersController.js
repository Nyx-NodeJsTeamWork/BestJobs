'use strict';
var JobOffer = require('mongoose').model('JobOffer');

var DEFAULT_PAGE_SIZE = 10;

module.exports = {
    getAllJobOffers: function (req, res, next) {
        var page = req.query.page || 1;
        
        var orderBy = req.query.orderBy || 'isOpen';
        var orderType = req.query.orderType === 'desc' ? '-' : '';
        
        //TODO: add filter
        //var companyId = req.query.company || '';
        //var categoryId = req.query.category || '';      
        //.where({ company: companyId })
        //.where({ categories: categoryId })
        
        JobOffer.find()
            .sort(orderType + orderBy)
            .skip(DEFAULT_PAGE_SIZE * (page - 1))
            .limit(DEFAULT_PAGE_SIZE)
            .exec(function (err, collection) {
            if (err) {
                return res.status(400)
                    .send({ reason: 'Job offers could not be loaded: ' + err.toString() });
            }
            
            res.send(collection);
        });
    },
    getJobOfferById: function (req, res, next) {
        JobOffer.findOne({ _id: req.params.id }).exec(function (err, offer) {
            if (err) {
                return res.status(404)
                    .send({ reason: 'Job offer could not be loaded: ' + err.toString() });
            }
            
            res.send(offer);
        });
    },
    applyForJobOfferById: function (req, res, next) {
        JobOffer.findOne({ _id: req.params.id }).exec(function (err, offer) {
            if (!offer.isOpen) { 
                return res.status(405)
                        .send('Job offer is closed, You\'re not allowed to apply for this job!');
            }

            if (offer.candidates.indexOf(req.user._id) === -1) {
                offer.candidates.push(req.user._id);
            } else { 
                return res.status(405)
                        .send('You already apply for this job!');   
            }

            offer.save(function (err, updatedItem, numberAffected) {
                if (err) {
                    return res.status(400)
                        .send('Error updating item: ' + err);
                }
                
                res.status(200).send('Successfully apply for a job!');
            });
        });
    }
};