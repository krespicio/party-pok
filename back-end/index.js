const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
// const FacebookStrategy = require("passport-facebook");
const PinterestStrategy = require("passport-pinterest").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const crypto = require("crypto");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User.js");
const fs = require("fs");

// Import Routes
const auth = require("./routes/auth");
const party = require("./routes/party");
const twilio = require("./routes/twilio");
const contacts = require("./routes/contacts");
const pinny = require("./routes/pinny");

const app = express();

const REQUIRED_ENVS = ["MONGODB_URI", "SECRET"];

REQUIRED_ENVS.forEach(function(el) {
	if (!process.env[el]) throw new Error("Missing required env var " + el);
});
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("open", () => console.log(`Connected to MongoDB!`));
mongoose.connection.on("error", function(err) {
	console.log("Mongoose default connection error: " + err);
});

// // Middleware Protocols
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// // Passport stuff
app.use(
	session({
		secret: process.env.SECRET,
		cookie: { secure: false, maxAge: 3600000 },
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

function hashPassword(password) {
	let hash = crypto.createHash("sha256");
	hash.update(password);
	return hash.digest("hex");
}

passport.serializeUser(function(user, done) {
	console.log("serializeUser", user, user._id);
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	console.log("deserializeUser", id);
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy(function(username, password, done) {
		// Find the user with the given username
		User.findOne({ username: username }, function(err, user) {
			// if there's an error, finish trying to authenticate (auth failed)
			if (err) {
				console.log(err);
				return done(err);
			}
			// if no user present, auth failed
			if (!user) {
				console.log(user);
				return done(null, false);
			}
			// if passwords do not match, auth failed
			if (user.password !== hashPassword(password)) {
				return done(null, false);
			}
			// auth has has succeeded
			// console.log('we good', user);
			return done(null, user);
		});
	})
);

// Tell passport how to read our user models for Facebook Login
// passport.use(
// 	new FacebookStrategy(
// 		{
// 			clientID: process.env.FACEBOOK_APP_ID,
// 			clientSecret: process.env.FACEBOOK_APP_SECRET,
// 			callbackURL: "http://localhost:3000/auth/facebook/callback",
// 			profileFields: ["id", "displayName", "photos"],
// 		},
// 		function(accessToken, refreshToken, profile, done) {
// 			User.findOrCreate(
// 				{ facebookId: profile.id },
// 				{
// 					username: profile.displayName,
// 					password: "idkwhattoputhere",
// 					pictureUrl: profile.photos[0].value,
// 					facebookId: profile.id,
// 					// phone: process.env.FROM_PHONE
// 				},
// 				function(err, user) {
// 					console.log(profile);
// 					return done(err, user);
// 					// done(null, user);
// 				}
// 			);
// 		}
// 	)
// );
passport.use(
	new PinterestStrategy(
		{
			clientID: process.env.PINTEREST_APP_ID,
			clientSecret: process.env.PINTEREST_APP_SECRET,
			scope: ["read_public", "read_relationships"],
			callbackURL: "https://localhost:5000/auth/pinterest/callback",
			state: true,
		},
		function(accessToken, refreshToken, profile, done) {
			console.log("henlo");
			User.findOrCreate({ pinterestId: profile.id }, function(err, user) {
				return done(err, user);
			});
		}
	)
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", twilio);
app.use("/", auth(passport));
app.use("/", party);
app.use("/", pinny);
app.use("/", contacts);

const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const https = require("https");

https
	.createServer(
		{
			key: fs.readFileSync("server.key"),
			cert: fs.readFileSync("server.cert"),
		},
		app
	)
	.listen(port, () => {
		console.log("Listening... on", port);
	});

module.exports = app;
