const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

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
			// "Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			// "Access-Control-Allow-Origin": "*", // Required for CORS support to work
			// "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
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

module.exports = router;
