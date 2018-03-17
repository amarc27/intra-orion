const express = require('express');
const router = express.Router();
const User = require('../models/user');
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


// Route to get all users
router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users)
    })
});



//GET a single user
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  User.findById(req.params.id, (err, user) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(user);
    });
});





// Route to add a user
router.post('/', (req, res, next) => {
  const user = new User({
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

  user.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New user created!',
      id: user._id
    });
  });
});



/* EDIT a user. */
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
  
  User.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'User updated successfully'
    });
  });
})




/* DELETE a user. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  User.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'User has been removed!'
    });
  })
});













// Route to add a picture on one user with Cloudinary
// To perform the request throw Postman, you need
// - Endpoint: POST http://localhost:3030/api/users/picture
// - Select: Body > form-data
// - Put as key: picture (and select "File")
// - Upload your file
// To perform the request in HTML:
//   <form method="post" enctype="multipart/form-data" action="http://localhost:3030/api/users/picture">
//     <input type="file" name="picture" />
//     <input type="submit" value="Upload" />
//   </form>
router.post('/picture-one-user', parser.single('picture'), (req, res, next) => {
  User.findOneAndUpdate({}, {pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

module.exports = router;