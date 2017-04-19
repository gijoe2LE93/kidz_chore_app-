//-----------------------
//require mongoose
//-----------------------

var mongoose = require('mongoose');
//--------------------------------
// require Chores in Kidz model
//--------------------------------
var Chores = require('./chores.js');

//-----------------------
//Create Schema for kidz
//-----------------------
var kidzSchema = mongoose.Schema({
    name: String,
    age: Number,
    chores: [Chores.schema]
});

//---------------------------
//Set kidz schema to variable
//---------------------------
var kidz = mongoose.model('Kidz', kidzSchema);



//-----------------------
//export model for use
//-----------------------
module.exports = kidz;
