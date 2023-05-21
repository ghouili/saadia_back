const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({

    date: { type: String, required: true },
    pdf: { type: String,  },
    type: { type: String },
    userid: { type: String },
    employeeid: { type: String },
});

module.exports = mongoose.model('document', documentSchema);