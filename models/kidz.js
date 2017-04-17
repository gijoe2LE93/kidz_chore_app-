//-----------------------
//require mongoose
//-----------------------

var mongoose = require('mongoose');

//-----------------------
//Create Schema for kidz
//-----------------------
var kidzSchema = mongoose.Schema({
    name: String,
    age: Number
});

//---------------------------
//Set kidz schema to variable
//---------------------------
var kidz = mongoose.model('Kidz', kidzSchema);



//-----------------------
//export model for use
//-----------------------
module.exports = kidz;
