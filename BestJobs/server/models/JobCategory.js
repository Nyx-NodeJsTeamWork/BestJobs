'use strict';
var mongoose = require('mongoose');

var jobCategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: '{PATH} is required'
    }
});

var JobCategory = mongoose.model('JobCategory', jobCategorySchema);