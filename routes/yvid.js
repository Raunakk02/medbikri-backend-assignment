const router = require("express").Router();
let Yvid = require("../models/yvid.model");

router.route("/").get((req, res) => {
	Yvid.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const username = req.body.username;
	console.log(req.body);

	const newUser = new User({ username });

	newUser
		.save()
		.then(() => res.json("User added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
