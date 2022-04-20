// const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const fetchAndSave = require("./fetch_and_save_videos");

// const app = express();

// app.use(express.json());
// app.use(express.static("public"));

// MONGODB

mongoose.connect(process.env.ATLAS_URL);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	// we're connected!
	console.log("Successfully connected to atlasss!!");
});

setInterval(() => {
	fetchAndSave();
}, 10000);

// fetchAndSave();

// // TODO START

// app.get("/", function (req, res) {
// 	res.send("How you doin?");
// });

// // TODO END

// app.listen(3000, function () {
// 	console.log("Server running on port 3000");
// });
