const express = require('express');
const router = express.Router();
const People = require('../models/people');
const jwt = require('jwt-simple');
const passport = require('passport');
const config = require('../config');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


router.post('/signup', (req, res, next) => {
  // extract the info we need from the body of the request
  const { email, firstname, mobilePhone, lastname, password, signupSecret } = req.body;

  //Chercher utilisateur via son email et son signupSecret
  People.findOne( {email: email, signupSecret})
    .then(people => {
      if (!people)
        return next(new Error("No people found"))
      console.log("Success", people);

      //Permettre au people de changer son password
      people.setPassword(password, (err, doc) => {
        if (err)
          return next(err)
        doc.save(err => {
          if (err)
            return next(err)
          res.json({ success: true })
        });
      })
    })
    .catch( (err) => {
      next(err)
    });

    // [
    //   check('email')
    //     .isEmail() .withMessage('Email is required') .trim(),
    
    //   check('password')
    //     .withMessage('Password is required') .trim(),

    //   check('firstname')
    //     .withMessage('Firstname is required') .trim(),
      
    //   check('lastname')
    //     .withMessage('Lastname is required') .trim(),

    //   check('mobilePhone')
    //     .withMessage('Mobile phone is required') .trim()
    // ]
});



router.post('/login', (req, res, next) => {
  const authenticate = People.authenticate();
  const { email, password } = req.body;
  // check if we have a email and password
  if (email && password) {
    // test if the credentials are valid
    authenticate(email, password, (err, people, failed) => {
      if (err) {
        // an unexpected error from the database
        return next(err);
      }
      if (failed) {
        // failed logging (bad password, too many attempts, etc)
        return res.status(401).json({
          error: failed.message,
        });
      }
      if (people) {
        // success!! Save the people id
        // NEVER save the password here
        // the id is usually enough because we can get back
        // the actual people by fetching the database later
        const payload = {
          id: people.id,
        };
        // generate a token and send it
        // this token will contain the people.id encrypted
        // only the server is able to decrypt it
        // for the client, this is just a token, he knows that
        // he has to send it
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({
          token,
          name: people.name,
        });
      }
    });
  } else {
    // unauthorized error
    res.sendStatus(401);
  }
});

// Example of secret route
// If you use Postman, don't forget to add "Authorization" "Bearer <your-JWT>" (without "<" and ">")
router.get('/secret', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  res.json({
    answerToLifeTheUniverseAndEverything: 42,
    people: req.people
  });
});

module.exports = router;