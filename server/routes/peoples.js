const express = require('express');
const router = express.Router();
const People = require('../models/people');
const passport = require('passport');
const config = require('../config');
const mongoose = require("mongoose");
const randomstring = require("randomstring");


const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });


// Route to get all people
router.get('/', (req, res, next) => {
  People.find()
    .then(peoples => {
      res.json(peoples)
    })
});



//GET a single people
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  People.findById(req.params.id, (err, people) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(people);
    });
});





// Route to add a people
router.post('/', (req, res, next) => {
  console.log(req.body);
  const people = new People({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobilePhone: req.body.mobilePhone,
    role: req.body.role,
    pictureUrl: req.body.pictureUrl,
    position: req.body.position,
    _company: req.body._company,
    email: req.body.email,
    signupSecret: randomstring.generate()
  });

  people.save((err) => {
    if (err) {
      console.log(err);
      
      res.json(err);
      return;
    }

    res.json({
      message: 'New people created!',
      id: people._id
    });
  });
});



/* EDIT a people. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobilePhone: req.body.mobilePhone,
    role: req.body.role,
    pictureUrl: req.body.pictureUrl,
    position: req.body.position,
    _company: req.body._company,
    email: req.body.email
  };
  
  People.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'People updated successfully'
    });
  });
})




/* DELETE a people. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  People.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'People has been removed!'
    });
  })
});













// Route to add a picture on one people with Cloudinary
// To perform the request throw Postman, you need
// - Endpoint: POST http://localhost:3030/api/peoples/picture
// - Select: Body > form-data
// - Put as key: picture (and select "File")
// - Upload your file
// To perform the request in HTML:
//   <form method="post" enctype="multipart/form-data" action="http://localhost:3030/api/peoples/picture">
//     <input type="file" name="picture" />
//     <input type="submit" value="Upload" />
//   </form>
router.post('/picture-one-people', parser.single('picture'), (req, res, next) => {
  People.findOneAndUpdate({}, {pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

module.exports = router;