var express = require('express');
var router = express.Router();

var Chores = require('../models/chores.js');
// ---------------------------------
// Create Chores Index Route
// ---------------------------------
router.get('/', function(req, res){
    Chores.find({}, function(err, foundChores){
        res.render('chores/index.ejs',{
            chores : foundChores
        });
    });
});

// ---------------------------------
// Create Chores New Route
// ---------------------------------
router.get('/new', function (req, res){
    res.render('chores/new.ejs');
});
//------------------------------
// Chores Create Route
//------------------------------
router.post('/', function(req,res){
    Chores.create(req.body, function(err, createdChores){
        res.redirect('/chores');
    });
});
//----------------------------
//Edit route
//----------------------------
router.get('/:id/edit', function(req, res){
    Chores.findById(req.params.id, function(err, foundChores){
        res.render('chores/edit.ejs', {
            chores: foundChores
        });
    });
});
//---------------------------------------
//Show chores list on chores index route
//---------------------------------------
router.get('/', function(req, res){
    //This finds all the chores
    Chores.find({}, function (err, foundChores) {
        res.render('chores/index.ejs',{
            chores:foundChores
        });
    });
});

//---------------------------------------
//Show Route
//---------------------------------------
router.get('/:id', function(req, res){
    Chores.findById(req.params.id, function(err, foundChores){
        res.render('chores/show.ejs', {
            chores:foundChores
        });
    });
});
//---------------------------------------
//Create Delete Route
//---------------------------------------
router.delete('/:id', function(req, res){
    Chores.findByIdAndRemove(req.params.id, function () {
        res.redirect('/chores');
    });
});
//------------------------------
//export chores
//------------------------------
module.exports = router;
