var mongoose = require('mongoose');
//--------------------------------
// require Kidz in Chores model
//--------------------------------
var Kidz = require('../models/kidz.js');
//--------------------------------
// Define Chores Schema
//--------------------------------
var choresSchema = mongoose.Schema({
    title:String,
    body:String,
    img:String
});

var Chores = mongoose.model('Chores', choresSchema);




module.exports = Chores;
