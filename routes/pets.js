'use strict';

var express = require('express');
var router = express.Router();
var moment = require('moment');

var Pet = require('../models/pet');
var Client = require('../models/client');

router.get('/', function(req, res, next) {
  Pet
    .find({})
    .populate('clients')
    .exec(function(err, pets) {
      if(err) return res.status(400).send(err);
      res.send(pets);
    })
});

// find one pet by ID and populate
router.get('/:id', function(req, res) {
  Pet.findById(req.params.id)
    .populate('clients')
    .exec(function(err, pet) {
    if(err || !pet) return res.status(400).send(err || 'Pet Not Found.');
      res.send(pet);
  });
});

router.post('/', function(req, res) {
  var pet = new Pet(req.body);
  pet.save(function(err, savedPet) {
    res.status(err ? 400 : 200).send(err || savedPet);
  });
});

// toggle checkin
router.put('/:id/checkin', function(req, res) {
  Pet.findById(req.params.id, function(err, pet) {
    if(err) return res.status(400).send(err);
    pet.checkedIn = !pet.checkedIn;
    pet.save(function(err, savedPet) {
      res.status(err ? 400 : 200).send(err || savedPet);
    });
  });
});

// update pet with client
router.put('/:petId/addClient/:clientId', function(req, res) {
  Client.findById(req.params.clientId, function(err, client) {
    if(err || !client) return res.status(404).send(err || 'Client Not Found!');

      Pet.findById(req.params.petId, function(err, pet) {
        if(err || !pet) return res.status(400).send(err || 'Pet Not Found.');

        pet.clients.push(req.params.clientId);
        pet.save(function(err, savedPet) {
          res.status(err ? 400 : 200).send(err || savedPet);
      });
    });
  });
});

// update pet with multiple clients
router.put('/:petId/addClients', function(req, res) {
    Pet.findById(req.params.petId, function(err, pet) {
      if(err || !pet) return res.status(400).send(err || 'Pet Not Found.');

      Client.find({_id: { $in: req.body.clientIds } }, function(err, clients) {
        if(err) return res.status(404).send(err);

        var clientIds = clients.map(client => client._id);

        pet.clients = pet.clients.concat(clientIds);

        pet.save(function(err, savedPet) {
          res.status(err ? 400 : 200).send(err || savedPet);
      });
    });
  });
});

// general update
router.put('/:id', function(req, res) {
  Pet.findByIdAndUpdate(req.params.id,
    { $set: req.body },
    { new: true },
    function(err, pet) {
      res.status(err ? 400 : 200).send(err || pet);
    });
});

module.exports = router;
