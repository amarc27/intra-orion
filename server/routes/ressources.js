const express = require('express');
const router = express.Router();
const Ressource = require('../models/ressource');
const passport = require('passport');
const config = require('../config');
const mongoose = require("mongoose");


const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });


// Route to get all ressources
router.get('/', (req, res, next) => {
  Ressource.find()
    .then(ressources => {
      res.json(ressources)
    })
});



//GET a single ressource
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Ressource.findById(req.params.id, (err, ressource) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(ressource);
    });
});





// Route to add a ressource
router.post('/', (req, res, next) => {
  const ressource = new Ressource({
    category: req.body.category,
    title: req.body.title,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    link: req.body.link
  });

  ressource.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New ressource created!',
      id: ressource._id
    });
  });
});



/* EDIT a ressource. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    category: req.body.category,
    title: req.body.title,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    link: req.body.link
  };
  
  Ressource.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Ressource updated successfully'
    });
  });
})




/* DELETE a ressource. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Ressource.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Ressource has been removed!'
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
    Ressource.findOneAndUpdate({}, {pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

module.exports = router;