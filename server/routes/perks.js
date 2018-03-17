const express = require('express');
const router = express.Router();
const Perk = require('../models/perk');
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


// Route to get all perks
router.get('/', (req, res, next) => {
  Perk.find()
    .then(perk => {
      res.json(perk)
    })
});



//GET a single perk
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Perk.findById(req.params.id, (err, perk) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(perk);
    });
});





// Route to add a perk
router.post('/', (req, res, next) => {
  const perk = new Perk({
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    category: req.body.category
  });

  perk.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New perk created!',
      id: perk._id
    });
  });
});



/* EDIT a perk. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    category: req.body.category
  };
  
  Perk.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Perk updated successfully'
    });
  });
})




/* DELETE a perk. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Perk.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Perk has been removed!'
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
  Perk.findOneAndUpdate({}, {pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

module.exports = router;