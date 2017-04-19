//-----------------------------
//Require express to use router
//-----------------------------

var express = require('express');
var router = express.Router();

//------------------------------
// Router Routes
//------------------------------
//------------------------------
// Require Kidz model
//------------------------------
var Kidz = require('../models/kidz.js');


//___________________
//7 Restful Routes
//___________________
// Index  : GET    '/products'          1/7
// Show   : GET    '/products/:id'      2/7
// New    : GET    '/prodcuts/new'      3/7
// Create : POST   '/products'          4/7
// Edit   : GET    '/products/:id/edit' 5/7
// Update : PUT    '/products/:id'      6/7
// Delete : DELETE '/products/:id'      7/7

//=======================================
//this routes shows the kidz index page
//1/7
//=======================================
router.get('/', function(req, res){
    Kidz.find({}, function(err, foundKidz){
        res.render('kidz/index.ejs', {
            kidz : foundKidz
        });
    });
});
//-------------------------
// Set up New Route 3/7
//-------------------------
router.get('/new', function(req, res ){
    res.render('kidz/new.ejs');
});
//-------------------------
// Kids on show page
//-------------------------
router.get('/:id', function(req, res){
    Kidz.findById(req.params.id, function(err, foundKidz){
        res.render('kidz/show.ejs', {
            kidz: foundKidz
        });
    });
});

//------------------------------
// Set up Post : create Routes 4/7 '/kidz'
//------------------------------
router.post('/', function ( req, res ){
    Kidz.create(req.body, function(err, createdKidz){
        res.redirect('/kidz');
    });
});

//-------------------------
// Set up Delete Route 7/7
//-------------------------
router.delete('/:id', function(req, res){
    Kidz.findByIdAndRemove(req.params.id, function(err, foundKidz){
        res.redirect('/kidz');
    });
});

//-------------------------
// Set up show Route /7
//-------------------------

router.get('/:id', function(req, res){
    Kidz.findById(req.params.id, function(err, foundKidz){
        res.render('kidz/show.ejs', {
            kidz: foundKidz
        });
    });
});

//-------------------------
// Set up edit Route 5/7
//-------------------------
router.get('/:id/edit', function(req, res){
    Kidz.findById(req.params.id, function(err, foundKidz){
        res.render('kidz/edit.ejs', {
            kidz: foundKidz
        });
    });
});

//-----------------------------
// Set up data update Route 6/7
//-----------------------------
router.put('/:id', function(req, res){
    Kidz.findByIdAndUpdate(req.params.id, req.body, function(err, foundKidz){
        res.redirect('/kidz');
    });
});



module.exports = router;
