const express = require('express');
const router = express.Router();
const Mail = require('../models/mail');
const config = require('../config');
const mongoose = require("mongoose");
var mailgun = require("mailgun-js");

require('dotenv').config();

var api_key = process.env.MAILGUN_API_KEY;
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

// Route to send an email
router.get('/', (req, res, next) => {
  var data = {
    from: 'Excited User <antoinefl.marc@gmail.com>',
    to: 'antoinefl.marc@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      next(error)
    }
    else
      res.json({success: true, senTo: data.to})
  });
});


module.exports = router;