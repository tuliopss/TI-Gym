const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    nameEx: String,
    setEx: Number,
    repEx: Number
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = { ExerciseSchema, Exercise };
