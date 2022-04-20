const { google } = require("googleapis");
const Yvid = require("./models/yvid.model");
const { data: sample } = require("./data"); // to emulate google's youtube api v3

function fetchAndSave() {
	// Fetching youtube videos
	// google
	// 	.youtube("v3")
	// 	.search.list({
	// 		key: process.env.GOOGLE_API_KEY,
	// 		part: ["snippet,id"],
	// 		maxResults: 10,
	// 		order: "date",
	// 		publishedAfter: "2020-01-01T00:00:00Z",
	// 		q: "laptop reviews",
	// 		relevanceLanguage: "en-us",
	// 		type: ["video"],
	// 	})
	// 	.then((res) => console.log(res.data))
	// 	.catch((err) => console.log(err));

	sample.items.forEach(function (vid, i) {
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

		newYvid
			.save()
			.then(() => console.log("New youtube video added! ", i))
			.catch((err) => console.log("Error: " + err));
	});
}

module.exports = fetchAndSave;
