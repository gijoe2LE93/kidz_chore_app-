//-------------------------
//Dependencies
//-------------------------
var kidzController = require('./controllers/kidz.js');
var choresController = require('./controllers/chores.js');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//------------------------------------
//Middleware
//-------------------------------------
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/kidz', kidzController);
app.use('/chores', choresController);

// ---------------------------------
// Set the localhost to 3000
// ---------------------------------
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kidz_app';

//----------------------------------
//Routes
//----------------------------------
app.get('/', function(req, res){
    res.render('index.ejs');
});
//=======================================
//connect to kidz app to mongoose db
//=======================================
mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function (){
    console.log('kidz_app connected to mongo');
});
//=======================================
//Listener
//=======================================
app.listen(port, function(){
    console.log('Project 2 is listening on ' + port);
});
