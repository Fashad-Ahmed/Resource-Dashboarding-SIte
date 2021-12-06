const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('teacher', TeacherSchema);
