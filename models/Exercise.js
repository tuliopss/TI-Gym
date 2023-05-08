const mongoose = require('mongoose');

const Exercise = mongoose.model('Exercise', {
    name: String,
    set: Number,
    rep: Number,
    
});

module.exports = Exercise