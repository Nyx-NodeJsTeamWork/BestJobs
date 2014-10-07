'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var companySchema = mongoose.Schema({
    name: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    recruiters: [{type: Schema.Types.ObjectId, ref: 'User'}],
    city: String
});

var Company = mongoose.model('Company', companySchema);