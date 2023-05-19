const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const employeecnssSchema = mongoose.Schema({

    date: { type: String, required: true },
    pdf: { type: String,  },
    userid: { type: String },
    employeeid: { type: String },
});

module.exports = mongoose.model('employeecnss', employeecnssSchema);