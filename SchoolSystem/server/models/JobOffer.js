'use strict';
var mongoose = require('mongoose');

var jobOfferSchema = mongoose.Schema({
    title: String,
    descriptionInfo: String,
    author: {
        type: Schema.Types.ObjectId,
        require: '{PATH} is required',
        ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        require: '{PATH} is required',
        ref: 'Company'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    candidates: {
        type: [User]
    },
    isOpen: Boolean
});

var JobOffer = mongoose.model('JobOffer', jobOfferSchema);