const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

//Set up route controllers
const homeRoute = require('./controllers/home');
const loginRoute = require('./controllers/login');

//Set up models where needed - delete where not
const User = require('./models').User;

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

// Set up routes
app.use('/', homeRoute);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
