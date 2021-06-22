const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const fetch      = require("node-fetch");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000, function () {
	console.log("Server is running on port 5000");
});

app.get('/', function (req, res) {
	res.redirect('/signup.html');
});

// Signup Route
app.post("/", (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Make sure fields are filled
  if (!firstName || !lastName || !email) {
	res.redirect("/fail.html");
	return;
  }

  // Construct req data
	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
  	};

  	const postData = JSON.stringify(data);

	fetch("https://us6.api.mailchimp.com/3.0/lists/c63d3c1424", {
		method: "POST",
		headers: {
		Authorization: "auth a0ac9a237528f736d7fe3dd5fd4e0ffa-us6",
		},
		body: postData,
	})
		.then(
		res.statusCode === 200
			? res.redirect("/success.html")
			: res.redirect("/fail.html")
		)
		.catch((err) => console.log(err));
});

/* app.post('/', (req, res) => {
	const {firstName, lastName, email} = req.body;

	if (!firstName || !lastName || !email) {
		res.redirect('/failure.html');
		return;
	}

	const data = {
	  members: {
		email_address: email,
		status: "subscribed",
		merge_fields: {
		  FNAME: firstName,
		  LNAME: lastName,
		},
	  },
	};

	const postData = JSON.stringify(data);
	
	fetch("https://us6.api.mailchimp.com/3.0/lists/c63d3c1424", {
	  method: "POST",
	  headers: {
		Authorization: "auth a0ac9a237528f736d7fe3dd5fd4e0ffa-us6",
	  },
	  body: postData,
	})
	  .then(
		res.statusCode === 200
		  ? res.redirect("/success.html")
		  : res.redirect("/failure.html")
	  )
	  .catch((err) => console.log(err));
}) */

// API Key
// 109a90e1e1150410ddac8ea0f241e5c5-us6

// Audience ID
// c63d3c1424