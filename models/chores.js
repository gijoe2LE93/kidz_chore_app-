var mongoose = require('mongoose');

var choresSchema = mongoose.Schema({
    title:String,
    body:String
});

var Chores = mongoose.model('Chores', choresSchema);

module.exports = Chores;
