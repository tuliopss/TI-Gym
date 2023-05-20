const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exercisesSchema = new Schema({
    nameEx: String,
    setEx: Number,
    repEx: Number
})

const memberSchema = new Schema({
    name: String,
    age: Number,
    workout: [exercisesSchema],
})

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
// const { ExerciseSchema } = require('./Exercise');

// const MemberSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     exercises: [ExerciseSchema]
// });



