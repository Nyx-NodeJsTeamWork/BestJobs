'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var cvSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    experience: [
        {
            jobTitle: [String],
            company: {
                type: Schema.Types.ObjectId,
                ref: 'Company'
            },
            timeFrame: {
                startDate: [Date],
                endDate: [Date]
            },
            description: String
        }
    ],
    skills: [String],
    languages: [String],
    certifications: [
        {
            title: [String],
            description: [String]
        }
    ],
    education: [
        {
            place: String,
            obtainedLevel: String,
            timeFrame: {
                startDate: [Date],
                endDate: [Date]
            }
        }
    ]
});

var CV = mongoose.model('CV', cvSchema);
