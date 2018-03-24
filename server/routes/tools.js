const express = require('express');
const router = express.Router();
const Tool = require('../models/tool');
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


// Route to get all tools
router.get('/', (req, res, next) => {
  Tool.find()
    .then(tool => {
      res.json(tool)
    })
});



//GET a single tool
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Tool.findById(req.params.id, (err, tool) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(tool);
    });
});





// Route to add a tool
router.post('/', (req, res, next) => {
  const tool = new Tool({
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    category: req.body.category
  });

  tool.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New tool created!',
      id: tool._id
    });
  });
});



/* EDIT a tool. */
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
  
  Tool.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Tool updated successfully'
    });
  });
})




/* DELETE a tool. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Tool.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Tool has been removed!'
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
  Tool.findOneAndUpdate({}, {pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

module.exports = router;