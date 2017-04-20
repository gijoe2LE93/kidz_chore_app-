var express = require('express');
var router = express.Router();


//--------------------------------
// require Kidz in Chores model
//--------------------------------
var Kidz = require('../models/kidz.js');
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
router.get('/new', function(req, res){
    //finds all kids for view on New Page
    Kidz.find({}, function(err, allKidz){
        res.render('chores/new.ejs', {
            kidz: allKidz
        });
    });
});
//------------------------------
// Chores Create Route
//------------------------------
router.post('/', function(req,res){
    //This finds all the kidz to post to chores array
    Kidz.findById(req.body.kidzId, function(err, foundKidz){
        Chores.create(req.body, function(err, createdChores){
            console.log(req.body);
            //pushes found kidz to the array
            foundKidz.chores.push(createdChores)
            //Saves the foundKidz
            foundKidz.save(function(err, data){
                res.redirect('/chores');
            });
        });
    });
}); // Kidz not defined error up to this point

//----------------------------
//Edit route
//----------------------------
router.get('/:id/edit', function(req, res){
    Chores.findById(req.params.id, function(err, foundChores){
        Kidz.find({}, function(err, foundKidz){
            Kidz.findOne({'chores._id':req.params.id}, function(err, foundChoresKidz) {
                res.render('chores/edit.ejs', {
                    chores: foundChores,
                    kidz: foundKidz,
                    choresKidz: foundChoresKidz
                });
            });

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
//Show Route with chores link
//---------------------------------------
router.get('/:id', function(req, res){
    Chores.findById(req.params.id, function(err, foundChores){
        Kidz.findOne({'chores._id':req.params.id}, function(err, foundKidz){
            console.log(foundChores)
            res.render('chores/show.ejs', {
                chores:foundChores
            });
        });
    });
});

//---------------------------------------
//Create Delete Route
//---------------------------------------
router.delete('/:id', function(req, res){
    Chores.findByIdAndRemove(req.params.id, function (err, foundChores){
        //find the kid with specific chore ID assigned
        Kidz.findOne({'chores._id': req.params.id}, function(err, foundKidz){
            //remove the chores assigned to specific child
            foundKidz.chores.id(req.params.id).remove();
            //save the new kidz profile without chore
            foundKidz.save(function(err, data){
                res.redirect('/chores');
            });
        });
    });
});

//------------------------------------------
//Create Put Route to update Chores and Kidz
//------------------------------------------
router.put('/:id', function(req, res){
    Chores.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedChores){
        Kidz.findOne({'chores._id': req.params.id }, function(err, foundKidz){
            console.log(req.body);
            if(foundKidz._id !== req.body.kidzId){
                foundKidz.chores.id(req.params.id).remove();
                                        console.log(req.body);
                foundKidz.save(function(err, savedFoundKidz){
                    Kidz.findById(req.body.kidzId, function(err, newKidz){

                        newKidz.chores.push(updatedChores);
                        newKidz.save(function(err, savedNewKdiz){
                            res.redirect('/chores/'+req.params.id);
                        });
                    });
                });
            } else {
                foundKidz.chores.id(req.params.id).remove();
                foundKidz.chores.push(updatedChores);
                foundKidz.save(function(err, data){
                    res.redirect('/chores/'+req.params.id);
                });

            }
        });
    });
});

//------------------------------
//export chores
//------------------------------
module.exports = router;
