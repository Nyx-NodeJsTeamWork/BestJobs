'use strict';
var mongoose = require('mongoose');

var companySchema = mongoose.Schema({
    name: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    recruiters: [mongoose.model('User').schema],
    city: String
});

var Company = mongoose.model('Company', companySchema);