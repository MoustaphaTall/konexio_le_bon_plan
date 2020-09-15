const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

const app = express();
const router = express.Router();
const upload = multer({ dest: 'public/profile_pics' });

const { User } = require('../models');

//configure passport
passport.use(new LocalStrategy(User.authenticate())); //get user who wants to authenticate
passport.serializeUser(User.serializeUser()); //save user._id to the session, encrypting password
passport.deserializeUser(User.deserializeUser()); //receive user._id from the session and fetch him from DB

const checkUser = (req, res, next) => {
	if (req.isAuthenticated() === true) {
		res.redirect('/admin');
	} else {
		next();
	}
};

router.get('/', checkUser, (req, res) => {
	console.log('GET /signup');
	res.render('signup');
});

router.post('/', upload.single('profilePic'), (req, res) => {
	console.log('POST /signup');
	console.log('/signup req.file', req.file);
	console.log('/signup req.body', req.body);

	let profilePicPath = req.file.path;
	const clientPicPath = profilePicPath.replace('public', '');
	console.log(clientPicPath);

	const { username, password, firstname, surname } = req.body;

	//User.register(user, password, callback)
	User.register(
		new User({
			username,
			firstname,
			surname,
			userPic: clientPicPath,
		}),
		password, //password will be hashed
		(err, userDb) => {
			if (err) {
				console.log('/signup user register err', err);
				return res.render('signup');
			} else {
				//authenticate is local because we are in local here, but could be a facebook login, github...
				//it will inject all user info : req.user, req.isAuthenticated() etc
				passport.authenticate('local')(req, res, () => {
					res.redirect('/admin');
				});
			}
		}
	);
});

module.exports = router;
