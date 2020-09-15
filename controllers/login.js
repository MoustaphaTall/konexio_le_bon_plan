const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');

const { User } = require('../models');

//configure passport
passport.use(new LocalStrategy(User.authenticate())); //get user who authenticates himself
passport.serializeUser(User.serializeUser()); //save user.id to the session, encrypting password
passport.deserializeUser(User.deserializeUser()); //receive user.id from the session and fetch him from DB

const checkUser = (req, res, next) => {
	if (req.isAuthenticated() === true) {
		res.redirect('/admin');
	} else {
		next();
	}
};

router.get('/', checkUser, (req, res) => {
	res.render('login');
});

router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/admin',
		failureRedirect: '/login',
	})
);

module.exports = router;
