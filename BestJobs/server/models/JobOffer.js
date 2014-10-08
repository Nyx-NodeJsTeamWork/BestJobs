'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var jobOfferSchema = mongoose.Schema({
    title: String,
    descriptionInfo: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        require: '{PATH} is required',
        ref: 'User'
    },
    hired: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        require: '{PATH} is required',
        ref: 'JobCategory'
    },
    skillsRequired: [String],
    employementType: {
        type: String,
        enum: ['full-time', 'part-time']
    },
    experienceRequired: [String],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        require: '{PATH} is required',
        ref: 'Company'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    candidates: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    isOpen: Boolean
});

var JobOffer = mongoose.model('JobOffer', jobOfferSchema);

module.exports.seedInitialJobOffer = function () {
    JobOffer.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find job offer: ' + err);
            return;
        }
        
        if (collection.length === 0) {
            JobOffer.create({
                title: 'C#',
                descriptionInfo: 'Lorem Ipsum',
                author: '5435cddb82312b5c93e04241',
                skillsRequired: ['Good knowledge', '1 year .net experiance'],
                employmentType: 'full-time',
                isOpen: true
            });
            
            console.log('Job Offer added to database...');
        }
    });
};