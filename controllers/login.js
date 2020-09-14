const express = require('express');
const router = express.Router();
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');
const LocalStrategy = require('passport-local');

// enable session management
// app.use(
// 	expressSession({
// 		secret: 'grouplebonplan04',
// 		resave: false,
// 		saveUninitialized: false,
// 		store:
// 	})
// )
