var Notification = require('mongoose').model('Notification');

module.exports = {
    getAllNotifications: function (req, res, next) {
        Notification.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Notifications could not be loaded: ' + err);
            }
            
            res.send(collection);
        })
    },
    getNotificationById: function (req, res, next) {
        Notification.findOne({ _id: req.params.id }).exec(function (err, course) {
            if (err) {
                console.log('Notification could not be loaded: ' + err);
            }
            
            res.send(course);
        })
    }
};