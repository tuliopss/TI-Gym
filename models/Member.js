const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const memberSchema = new Schema({
    name: String,
    age: Number,
    objective: String,
})

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
// const { ExerciseSchema } = require('./Exercise');

// const MemberSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     exercises: [ExerciseSchema]
// });



