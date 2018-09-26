const mongoose = require('mongoose');

const user = new mongoose.Schema({
name : String,
lastname : String,
email : {
    type : String,
    unique : true,
    required : true
},
password : String
});

module.exports = user;