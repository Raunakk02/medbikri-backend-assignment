const { google } = require("googleapis");
const Yvid = require("./models/yvid.model");

// Fetching youtube videos and saving them to the database
function fetchAndSave() {
	google
		.youtube("v3")
		.search.list({
			key: process.env.GOOGLE_API_KEY,
			part: ["snippet,id"],
			maxResults: 10,
			order: "date",
			publishedAfter: "2020-01-01T00:00:00Z",
			q: "laptop reviews",
			relevanceLanguage: "en-us",
			type: ["video"],
		})
		.then((res) => saveData(res.data.items))
		.catch((err) => console.log(err));
}

// Mapping the fetched youtube videos to a promise array
// which can be used to determine if all the videos were saved
// to the database or not.
function saveData(items) {
	let promises = items.map(function (vid) {
		const {
			id: { videoId },
			snippet: { publishedAt, title, description, thumbnails },
		} = vid;

		const newYvid = new Yvid({
			id: videoId,
			title,
			description,
			publishedAt: Date.parse(publishedAt),
			thumbnails: {
				default: thumbnails.default.url,
				medium: thumbnails.medium.url,
				high: thumbnails.high.url,
			},
		});

		return newYvid.save();
	});

	Promise.all(promises).then(
		console.log("Added fetched results to the database")
	);
}

// Function to get the paginated results from the database
function getPaginatedYvids(limit, skipIndex) {
	return Yvid.find()
		.sort({ publishedAt: -1 })
		.limit(limit)
		.skip(skipIndex)
		.exec();
}

// Function to get the videos containing particular title
// and description from the database
async function getYVideos(title = "", description = "") {
	return await Yvid.find({
		title: { $regex: title, $options: "$i" },
		description: { $regex: description, $options: "$i" },
	}).exec();
}

module.exports = { fetchAndSave, getPaginatedYvids, getYVideos };
