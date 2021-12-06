const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    // teacher: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'teacher'
    // },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('job', JobSchema);
