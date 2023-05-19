const mongoose = require('mongoose');

const Instructor = mongoose.model('Instructor', {
    name: String,
    salary: Number,
    department: String
});

module.exports = Instructor
