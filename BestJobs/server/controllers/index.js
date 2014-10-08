'use strict';

var UsersController = require('../controllers/UsersController');
var JobOffersController = require('../controllers/JobOffersController');
var CompaniesController = require('../controllers/CompaniesController');
var NotificationsController = require('../controllers/NotificationsController');

module.exports = {
    users : UsersController,
    companies : CompaniesController,
    jobOffers: JobOffersController,
    notifications: NotificationsController
};