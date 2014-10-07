'use strict';
var mongoose = require('mongoose');

var jobOfferSchema = mongoose.Schema({
    title: String,
    descriptionInfo: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        require: '{PATH} is required',
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
    candidates: {
        type: [mongoose.model('User').schema]
    },
    isOpen: Boolean
});

var JobOffer = mongoose.model('JobOffer', jobOfferSchema);