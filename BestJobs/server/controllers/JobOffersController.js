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
                res.status(400);
                return res.send({ reason: 'Job offers could not be loaded: ' + err.toString() });
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