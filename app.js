var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const api = require("./api");

var path = require('path');

// parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// static middleware
app.use('/files', express.static(path.join(__dirname, './public/static')));

// forbidden error handler
app.use('/forbidden', (req, res, next) => {
	console.log("forbidden")
	var error = new Error("Forbidden");
	error.status = 403;
	next(error)
})


// routes in api/index.js -->
// books.js for api/books and numVisits.js for api/numVisits
app.use('/', api)

app.use('/', (req, res, next) => {
	var error = new Error("Broken");
	error.status = 500;
	// next(error)
	res.status(500).send("Broken")
})


// any other broken link
app.use('/', (err, req, res, next) => {
	res.sendStatus(err.status || 500);
})




module.exports = app;