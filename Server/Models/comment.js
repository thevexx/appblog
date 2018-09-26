const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    content: String,
    creationDate: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    } // ce commentaire pour quel auteur

});

module.exports = comment;