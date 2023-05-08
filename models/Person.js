const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    department: String
});

module.exports = Person