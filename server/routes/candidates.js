const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const config = require('../config');
const mongoose = require("mongoose");


// Route to get all candidates
router.get('/', (req, res, next) => {
  Candidate.find()
    .then(candidates => {
      res.json(candidates)
    })
});



//GET a single candidate
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Candidate.findById(req.params.id, (err, candidate) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(candidate);
    });
});





// Route to add a candidate
router.post('/', (req, res, next) => {
  const candidate = new Candidate({
    skill: req.body.skill,
    contract: req.body.contract,
    // date      
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  });

  candidate.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New candidate created!',
      id: candidate._id
    });
  });
});



/* EDIT a candidate. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    skill: req.body.skill,
    contract: req.body.contract,
    // date      
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  };
  
  Candidate.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Candidate updated successfully'
    });
  });
})




/* DELETE a candidate. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Candidate.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Candidate has been removed!'
    });
  })
});


module.exports = router;