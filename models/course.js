const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    subjectArea: {
        type: String,
        required: true
    },
    creditHours: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;