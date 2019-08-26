const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const rp = require("request-promise");
const cheerio = require("cheerio");

const token = process.env.PINTEREST_APP_TOKEN;

router.post("/pinterest", (req, res) => {
	console.log("we about to go into the fetch for pinterest");
	const search = req.body.search
		.split(" ")
		.join("-")
		.toLowerCase();
	console.log(search);
	const link = `https://api.pinterest.com/v1/boards/kylerbar310/${search}/pins/?access_token=<${token}>`;
	fetch(link, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then(response => response.json())
		.then(responseJSON =>
			res.json({
				success: true,
				msg: "Successfully fetched board from Pinterest",
				data: responseJSON.data,
			})
		)
		.catch(e => {
			res.json({ success: false, msg: "Something happened to the Pinterest API" });
			console.log(e);
		});
});

router.get("/yeet", (req, res) => {
	console.log("yeetus");
	const options = {
		uri: "https://www.prettymyparty.com/26-sweet-ice-cream-party-ideas/",
		transform: function(body) {
			return cheerio.load(body);
		},
	};

	rp(options)
		.then(function($) {
			// Process html like you would with jQuery...
			res.json({ success: true, data: $("img")["16"].attribs });
			console.log($("img")["16"]);
		})
		.catch(function(err) {
			// Crawling failed or Cheerio choked...
			res.json({ success: false });
			console.log(err);
		});
});
module.exports = router;
