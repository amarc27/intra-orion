const express = require('express');
const router = express.Router();
const Knowledge = require('../models/knowledge');
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


// Route to get all knowledge
router.get('/', (req, res, next) => {
  Knowledge.find()
    .then(knowledge => {
      res.json(knowledge)
    })
});



//GET a single knowledge
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Knowledge.findById(req.params.id, (err, knowledge) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(knowledge);
    });
});





// Route to add a knowledge
router.post('/', (req, res, next) => {
  const knowledge = new Knowledge({
    category: req.body.category,
    title: req.body.title,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    link: req.body.link
  });

  knowledge.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New knowledge created!',
      id: knowledge._id
    });
  });
});



/* EDIT a knowledge. */
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
  
  Knowledge.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Knowledge updated successfully'
    });
  });
})




/* DELETE a knowledge. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Knowledge.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Knowledge has been removed!'
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
  Knowledge.findOneAndUpdate({}, {pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

module.exports = router;