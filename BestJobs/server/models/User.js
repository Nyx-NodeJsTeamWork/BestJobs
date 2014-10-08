'use strict';
var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    salt: String,
    hashPass: String,
    roles: {
        type: String,
        require: '{PATH} is required',
        enum: ['admin', 'recruiter', 'user']
    },
    jobsApplied: [{
        type: Schema.Types.ObjectId,
        ref: 'JobOffer'
    }],
    cv: {
        type: Schema.Types.ObjectId,
        ref: 'CV'
    }
});

userSchema.method({
    authenticate: function (password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }

        return false;
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt,
                hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');

            User.create({
                username: 'pesho',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['admin']
            });

            console.log('Users added to database...');
        }
    });
};