const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const { Strategy, ExtractJwt } = require("passport-jwt");

const config = require("./config");
var authRoutes = require('./routes/auth');
var peoplesRoutes = require('./routes/peoples');
var companiesRoutes = require('./routes/companies');
var perkRoutes = require('./routes/perks');
var candidateSchema = require('./routes/candidates');
var ressourceSchema = require('./routes/ressources');

require('./configs/database');


const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set the public folder to "~/client/build/"
// Example: http://localhost:3030/favicon.ico => Display "~/client/build/favicon.ico"
app.use(express.static(path.join(__dirname, '../client/build')));


app.use(passport.initialize());
// Create the strategy for JWT
const strategy = new Strategy(
  {
    // this is a config we pass to the strategy
    // it needs to secret to decrypt the payload of the
    // token.
    secretOrKey: config.jwtSecret,
    // This options tells the strategy to extract the token
    // from the header of the request
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  (payload, done) => {
    // payload is the object we encrypted at the route /api/token
    // We get the user id, make sure the user exist by looking it up
    People.findById(payload.id).then(people => {
      if (people) {
        // make the people accessible in req.people
        done(null, people);
      } else {
        done(new Error("People not found"));
      }
    });
  }
);
// tell pasport to use it
passport.use(strategy);

// List all your API routes
app.use('/api', authRoutes);
app.use('/api/people', peoplesRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/perks', perkRoutes);
app.use('/api/candidates', candidateSchema);
app.use('/api/ressources', ressourceSchema);


// For any routes that starts with "/api", catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// For any other routes, redirect to the index.html file of React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  console.error("----- An error happened -----");
  console.error(err);
  if (process.env.NODE_ENV === 'production')
    res.json(err); // A limited amount of information sent in production
  else
    res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))));
});

module.exports = app;
