const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courses: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('Cart', cartSchema);
