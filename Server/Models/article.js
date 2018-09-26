const mongoose = require('mongoose');

const article = new mongoose.Schema({
    title: String,
    content: String,
    creationDate: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]

});

module.exports = article;