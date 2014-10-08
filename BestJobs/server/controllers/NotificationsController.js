'use strict';
var Notification = require('mongoose').model('Notification');

module.exports = {
    // check if admin - admin can see all notifications.
    getAll: function (req, res) {
        var currentUser = req.user._id;
        Notification.find({receiver: currentUser}).exec(function (err, collection) {
            if (err) {
                return res.status(400)
                    .send({ reason: 'Notifications could not be loaded: ' + err.toString() });
            }

            if (!collection) {
                return res.status(404)
                    .send({ reason: 'No notifications found'});
            }

            res.send(collection);
        });
    },
    getById: function (req, res) {
        var currentUser = req.user._id;
        Notification.findOne({ _id: req.params.id, receiver: currentUser }).exec(function (err, notification) {
            if (err) {
                return res.status(400)
                    .send({ reason: 'Notification could not be loaded: ' + err.toString() });
            }

            if (!notification) {
                return res.status(404)
                    .send('You don\'t have such notification');
            }

            res.send(notification);
        });
    },
    createNotification: function (req, res) {
        var notification = req.body;

        notification.sender = req.user._id;

        Notification.create(notification, function (err, notification) {
            if (err) {
                return res.status(400)
                    .send({ reason: 'Failed to create new offer: ' + err.toString() });
            }

            res.status(201).send(notification);
        });
    }
};