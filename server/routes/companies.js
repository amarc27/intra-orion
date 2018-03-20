const express = require('express');
const router = express.Router();
const Company = require('../models/company');
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


// Route to get all companies
router.get('/', (req, res, next) => {
  Company.find()
    .then(companies => {
      res.json(companies)
    })
});



//GET a single company
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Company.findById(req.params.id, (err, company) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(company);
    });
});





// Route to add a company
router.post('/', (req, res, next) => {
  const company = new Company({
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    _employees: req.body._employees,
    website: req.body.website,
    role: req.body.role,
    sector: req.body.sector
  });

  company.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New company created!',
      id: company._id
    });
  });
});



/* EDIT a company. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    _employees: req.body._employees,
    website: req.body.website,
    role: req.body.role,
    sector: req.body.sector
  };
  
  Company.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Company updated successfully'
    });
  });
})




/* DELETE a company. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Company.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Company has been removed!'
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
  Company.findOneAndUpdate({}, {pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

module.exports = router;