'use strict';
var JobOffer = require('mongoose').model('JobOffer');
var User = require('mongoose').model('User');
var mongoose = require('mongoose');
var DEFAULT_PAGE_SIZE = 10;

module.exports = {
    getAllJobOffers: function (req, res, next) {
        var page = req.query.page || 1;

        var orderBy = req.query.orderBy || 'isOpen';
        var orderType = req.query.orderType === 'desc' ? '-' : '';

        var query = JobOffer.find()
            .where({ isOpen: true })
            .sort(orderType + orderBy)
            .skip(DEFAULT_PAGE_SIZE * (page - 1))
            .limit(DEFAULT_PAGE_SIZE);

        if (req.user.roles.indexOf('recruiter') > -1 && req.query.isMine) {
            query = query.where('author', mongoose.Types.ObjectId(req.user._id));
        }

        query.exec(function (err, collection) {
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
    },
    createJobOffer: function (req, res, next) {
        var jobOfferData = req.body;

        jobOfferData.author = req.user._id;
        jobOfferData.isOpen = true;

        JobOffer.create(jobOfferData, function (err, offer) {
            if (err) {
                return res.status(400)
                    .send({ reason: 'Failed to create new offer: ' + err.toString() });
            }

            res.status(201).send(offer);
        });
    },
    getJobOfferDetailsInfo: function (req, res, next) {
        var currentUser = req.user._id;

        JobOffer.findOne({ _id: req.params.id }).exec(function (err, offer) {
            if (err) {
                return res.status(400)
                    .send({ reason: 'Fail to get details info for this offer: ' + err.toString() });
            }

            if (offer.author.equals(currentUser)) {
                User.find({
                    '_id': {
                        $in: offer.candidates
                    }
                }, function (err, users) {
                    res.status(200).send(users);
                });
            } else {
                res.status(200).send(offer);
            }
        });
    },
    acceptCandidateForTheJob: function (req, res, next) {
        var offerId = req.body.offerId;
        if (!offerId) {
            return res.status(400)
                .send({ reason: 'There is no offer id provided!' });
        }

        var acceptedCandidate = req.params.id;

        JobOffer.findOne({ _id: offerId }).exec(function (err, offer) {
            if (err) {
                return res.status(400)
                    .send({ reason: 'There is no offer with this id!' });
            }

            if (!offer.author.equals(req.user._id)) {
                return res.status(400)
                    .send({ reason: 'Can\'t hire candidate because it\'s not your own offer!' });
            }

            if (offer.candidates.indexOf(acceptedCandidate) == -1) {
                return res.status(400)
                    .send({ reason: 'There is no candidate in this offer with this id!' });
            }

            if (!offer.isOpen) {
                return res.status(400)
                    .send({ reason: 'This offer is closed!' });
            }

            var updateOfferModel = {
                hired: acceptedCandidate,
                isOpen: false
            };


            JobOffer.update({ _id: offerId }, updateOfferModel, function (updateErr, updatedOffer) {
                if (updateErr) {
                    return res.status(405)
                        .send({ reason: 'Problem occure when updating the offer: ' + updateErr.toString() });
                }

                res.status(200).end();
            })
        });
    }
};