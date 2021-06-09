const mongoose = require('mongoose')

const students_schema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        },
        name: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }
})


const student_s = mongoose.model('student_data', students_schema)

module.exports = student_s