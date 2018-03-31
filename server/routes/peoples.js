const express = require('express');
const router = express.Router();
const People = require('../models/people');
const passport = require('passport');
const config = require('../config');
const mongoose = require("mongoose");
const randomstring = require("randomstring");
var mailgun = require("mailgun-js");

var api_key = process.env.MAILGUN_API_KEY;
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });


// Route to get all people
router.get('/', (req, res, next) => {
  let filter = {}
  if (req.query.role)
    filter.role = req.query.role
  People.find(filter)
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





// Route to add a people by sending an email
router.post('/', (req, res, next) => {
  var signupSecret = randomstring.generate()
  
  var mailData = {
    from: 'Antoine @Orion <antoine@orionth.co>',
    to: req.body.email,
    subject: 'Welcome, ' + req.body.firstname,
    html: `
      <html> 
        <h2>Welcome to Orion family 🔥 </h2> 
        <p>To register yourself, you need to sign up on 
          <a href='http://localhost:3000/signup?email=${req.body.email}&signupSecret=${signupSecret}'>this page</a>, 
          using this log :
        </p>
        <p><strong>Login</strong> : ${req.body.email} </p>
        <p>See you soon, my friend ❤️</p> 
      </html>`
  };

  const people = new People({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobilePhone: req.body.mobilePhone,
    role: req.body.role,
    pictureUrl: req.body.pictureUrl,
    position: req.body.position,
    _company: req.body._company,
    email: req.body.email,
    signupSecret: signupSecret
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

  mailgun.messages().send(mailData, function (error, body) {
    if (error) {
      console.log(error)
    }
  });
});

// TODO: only ADMIN can delete/edit

/* EDIT a people. */
router.put('/:id', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  if (req.user.role !== 'Admin')
    return next(new Error("You are not an admin bitch!"));
  
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
  console.log("DEBUG post('/picture-one-people'");
  console.log("DEBUG req.body", req.body);
  
  People.findByIdAndUpdate( req.body.peopleId, {pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

module.exports = router;