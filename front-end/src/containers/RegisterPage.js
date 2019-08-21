import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";

export default function RegisterPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [verifiedPassword, setVerifiedPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const [errorText, setErrorText] = useState("");
	const [flipStyle, setFlipStyle] = useState({});
	const [loggedIn, setLogin] = useState(false);

	const handleUsername = event => {
		setUsername(event.target.value);
	};

	const handlePassword = event => {
		setPassword(event.target.value);
	};

	const handleVerifiedPassword = event => {
		setVerifiedPassword(event.target.value);
	};

	const handleLoginUsername = event => {
		setLoginUsername(event.target.value);
	};

	const handleLoginPassword = event => {
		setLoginPassword(event.target.value);
	};

	const submitData = () => {
		if (username.length === 0) {
			setErrorText("Please enter a valid username");
		} else if (password.length < 4) {
			setErrorText("Please input a password of at least length 4");
		} else if (password !== verifiedPassword) {
			setErrorText("The passwords do not match");
		} else {
			postSubmit().catch(e => {
				setErrorText("Failed to create user, please try again.");
			});
		}
	};

	const postSubmit = async () => {
		const response = await fetch("https://localhost:5000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
				firstName,
				lastName,
			}),
		});
		const content = await response.json();
		if (!content.success) {
			setErrorText("Sorry, this user already exists");
		}
	};

	const postLogin = async () => {
		const response = await fetch("https://localhost:5000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			credentials: "include",
			body: JSON.stringify({
				username: loginUsername,
				password: loginPassword,
			}),
		});
		const content = await response.json();
		if (!content.success) {
			setErrorText("Wrong username or password");
		} else {
			setLogin(true);
		}
	};

	const pinterestLogin = async () => {
		const response = await fetch("https://localhost:5000/auth/pinterest", {
			method: "GET",
			redirect: "follow",
			credentials: "include",
			headers: {
				"Access-Control-Allow-Origin": "*", // Required for CORS support to work
				"Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
			},
		});
		const content = await response.json();
		if (!content.success) {
			setErrorText("Wrong username or password");
		} else {
			setLogin(true);
		}
	};

	const flipCard = () => {
		setFlipStyle({ transform: `rotateY(180deg)` });
	};

	if (loggedIn) {
		return <Redirect to="/" />;
	}

	return (
		<div className="register-container">
			<nav className="navbar navbar-light bg-light" id="register-navbar">
				<div className="navbar-child" />
				<a className="navbar-brand" className="header-logo navbar-child">
					Party Pok
				</a>
				<div className="login-wrapper navbar-child">
					<input
						type="text"
						placeholder="username"
						className="form-control mr-sm-2"
						value={loginUsername}
						onChange={e => handleLoginUsername(e)}
					/>
					<input
						type="password"
						placeholder="password"
						className="form-control mr-sm-2"
						value={loginPassword}
						onChange={e => handleLoginPassword(e)}
					/>
					<button
						onClick={() =>
							postLogin().catch(e => {
								setErrorText("Login request failed, please try again.");
							})
						}
						className="login-btn">
						Login
					</button>
					<button>
						<a href="https://localhost:5000/auth/pinterest">Login with Pinterest</a>
					</button>
				</div>
			</nav>
			<div className="flip-card">
				<div className="flip-card-inner" style={flipStyle}>
					<div className="flip-card-back">
						<h3>Register to find out!</h3>
						<hr />
						<p>{errorText}</p>
						<input
							type="text"
							className="form-control"
							placeholder="Username"
							value={username}
							onChange={e => handleUsername(e)}
						/>
						<input
							type="text"
							className="form-control"
							placeholder="First Name"
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
						/>
						<input
							type="text"
							className="form-control"
							placeholder="Last Name"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
						/>
						<input
							type="password"
							className="form-control"
							placeholder="Password"
							value={password}
							onChange={e => handlePassword(e)}
						/>
						<input
							type="password"
							className="form-control"
							placeholder="Verify Password"
							value={verifiedPassword}
							onChange={e => handleVerifiedPassword(e)}
						/>
						<br />
						<button onClick={() => submitData()} className="register-submit-btn">
							Submit
						</button>
					</div>
				</div>
			</div>
			<p>
				Don't have an account?{" "}
				<button className="emptyButton" onClick={() => flipCard()}>
					Register.
				</button>
			</p>
		</div>
	);
}
