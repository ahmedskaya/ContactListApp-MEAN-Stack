// require express module of node
var express = require('express');
// initiate a new express app 
var app = express();
//require mongojs module to connect to the db
var mongojs = require('mongojs');
// which db and collection to use
var db = mongojs('contactlist', ['contactlist']);
// require bodyParser
var bodyParser = require('body-parser');

// set a route to the index page
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// get all saved entries 
app.get('/contactlist', function(req, res){
	// console.log a test
	console.log("I receive a GET request");
	db.contactlist.find(function(err, docs){
		res.json(docs);
	})
});

// post/insert new entries
app.post('/contactlist', function (req, res) {
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

// delete exist entries
app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	})
});

// get data to be updated
app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	})
});

// save the updated record
app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
		})
});

// define a port to run the app
app.listen(3001);
console.log("Server is running on port 3001");