const express = require('express');
const exphbs = require('express-handlebars');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models').User;
const port = process.env.PORT || 3000;

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/le_bon_plan',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
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

app.get('/', (req, res) => {
	res.render('home');
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
