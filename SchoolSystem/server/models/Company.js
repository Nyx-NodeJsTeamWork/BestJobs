var mongoose = require('mongoose');

var companySchema = mongoose.Schema({
    name: {
        type: String,
        require: '{PATH} is required', 
        unique: true
    },
    recruiters: { type: [User] },
    city: String
});

var Company = mongoose.model('Company', companySchema);