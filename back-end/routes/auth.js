const express = require("express");
const router = express.Router();
const crypto = require("crypto");

// User Mongo
const User = require("../models/User");

function hashPassword(password) {
	let hash = crypto.createHash("sha256");
	hash.update(password);
	return hash.digest("hex");
}

module.exports = function(passport) {
	router.post("/register", function(req, res) {
		// console.log("in here to sign up dad");
		const newUser = new User({
			username: req.body.username,
			password: hashPassword(req.body.password),
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			documents: [],
		});
		User.findOne({ username: req.body.username }, function(err, user) {
			if (!user) {
				newUser.save(function(err, result) {
					if (err) {
						res.json({ success: false, error: err });
					}
					if (!err) {
						res.json({ success: true, error: "" });
					}
				});
			}
			if (user) {
				console.log("user already exists");
				res.json({ success: false, error: "Username is taken" });
			}
		});
	});

	router.post(
		"/login",
		passport.authenticate("local", {
			successRedirect: "/login/success",
			failureRedirect: "/login/failure",
		})
	);

	router.get("/auth/pinterest", passport.authenticate("pinterest"));

	router.get(
		"/auth/pinterest/callback",
		passport.authenticate("pinterest", { failureRedirect: "/login/failure" }),
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect("/login/success");
		}
	);

	router.get("/login/success", (req, res) => {
		console.log("in login success");
		res.json({ success: true });
		// console.log("success", req.user, req.session.user);
		return;
	});

	router.get("/login/failure", (req, res) => {
		res.json({ success: false });
		return;
	});

	// router.get("/user", async (req, res) => {
	// 	if (req.user) {
	// 		console.log("call of the user", req.user._id);
	// 		const user = await User.findOne({ _id: req.user._id })
	// 			.populate("documents")
	// 			.exec((err, user) => {
	// 				console.log(user);
	// 				if (user) {
	// 					return res.json(user);
	// 				}
	// 			});
	// 	}
	// });

	router.get("/user", (req, res) => {
		console.log("The req user is ", req.user);
		if (req.user) {
			res.json({ success: true, data: req.user });
		} else {
			res.json({ success: false });
		}
	});

	//GET Logout page
	router.get("/logout", function(req, res) {
		req.logout();
		res.json({
			success: true,
			msg: "Logged Out!",
		});
	});

	// Checks if the user is authenticated
	router.use((req, res, next) => {
		if (!req.user) {
			res.status(401).json({
				success: false,
				error: "Not authorized",
			});
			return;
		}
		next();
	});

	return router;
};
