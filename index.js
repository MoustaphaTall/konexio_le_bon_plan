const express = require('express');
const exphbs = require('express-handlebars');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

//Set up route controllers
const homeRoute = require('./controllers/home');
const loginRoute = require('./controllers/login');
<<<<<<< HEAD
const productRoute = require('./controllers/product');

//Set up models where needed - delete where not
const User = require('./models').User;
=======
const signupRoute = require('./controllers/signup');
const logoutRoute = require('./controllers/logout');
>>>>>>> 14ceffdc8e4424644e2f3cb1ffc85feaa9a0bc74

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/le_bon_plan',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	},
	(err) => {
		if (err !== null) {
			console.log('Error connecting to DB', err);
			return;
		}

		console.log('DB successfully connected');
	}
);

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//enable session management
app.use(
	expressSession({
		secret: 'grouplebonplan04',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

//enable passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/logout', logoutRoute);
app.use('/', homeRoute);
app.use('/products', productRoute);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
