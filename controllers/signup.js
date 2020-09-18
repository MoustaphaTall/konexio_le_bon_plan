const express = require('express');
const fs = require('fs');
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const router = express.Router();
const upload = multer({ dest: 'public/profile_pics' });

const { User } = require('../models');

//configure passport
passport.use(new LocalStrategy(User.authenticate())); //get user who wants to authenticate
passport.serializeUser(User.serializeUser()); //save user._id to the session, encrypting password
passport.deserializeUser(User.deserializeUser()); //receive user._id from the session and fetch him from DB

const checkUser = (req, res, next) => {
	if (req.isAuthenticated() === true) {
		res.redirect('/login');
	} else {
		next();
	}
};

const getNewPhotoPath = (fileObj, name) => {
	const extensions = {
		'image/png': 'png',
		'image/jpeg': 'jpeg',
	};
	const extension = extensions[fileObj.mimetype];
	const newName = name.toLowerCase().replace(' ', '_');
	const newPath = `${fileObj.destination}/${newName}.${extension}`;
	return newPath;
};

router.get('/', checkUser, (req, res) => {
	console.log('GET /signup');
	res.render('signup');
});

router.post('/', upload.single('profilePic'), (req, res) => {
	console.log('POST /signup');
	console.log('/signup req.file', req.file);
	console.log('/signup req.body', req.body);

	const placeholderPath = 'public/img/placeholder.png';
	const { username, password, firstname, surname } = req.body;
	const profilePicPath =
		getNewPhotoPath(req.file, username) || placeholderPath;

	if (profilePicPath !== placeholderPath) {
		const path = req.file.path;

		fs.rename(path, profilePicPath, (err) => {
			if (err !== null) {
				res.send('Error, try again');
				console.log('Error renaming the file', err);
				return;
			}
		});
	}

	//User.register(user, password, callback)
	User.register(
		new User({
			username,
			firstname,
			surname,
			userPic: profilePicPath.replace('public', ''),
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
					res.redirect('/login');
				});
			}
		}
	);
});

module.exports = router;
