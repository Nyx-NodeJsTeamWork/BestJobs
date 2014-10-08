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
        {type: Schema.Types.ObjectId, ref: 'User'}
    ],
    isOpen: Boolean
});

var JobOffer = mongoose.model('JobOffer', jobOfferSchema);