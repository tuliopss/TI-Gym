const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exercisesSchema = new Schema({
    name: String,
    set: Number,
    rep: Number
})

const memberSchema = new Schema({
    name: String,
    age: Number,
    workout: [exercisesSchema],
})

const Member = mongoose.model('Member', memberSchema);
module.exports = Member