import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const handleChange = (event) => {
		setCredentials({ ...credentials, [event.target.name]: event.target.value });
	};

	// make a post request to retrieve a token from the api
	const login = (event) => {
		event.preventDefault();
		axiosWithAuth()
			.post("/login", credentials)
			.then((response) => {
				window.localStorage.setItem("token", response.data.payload);
				props.history.push("/feed");
			})
			.catch((error) => {
				console.log("Error:", error.response.data.message);
				alert(`Oops.. Looks like there was an error. ${error.response.data.message}`);
			});
	};
	// when you have handled the token, navigate to the BubblePage route
	return (
		<>
			<div className="login-div">
				<h2>Login</h2>
				<form className="login-form" onSubmit={login}>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						placeholder="username"
						value={credentials.username}
						onChange={handleChange}
					/>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						placeholder="password"
						value={credentials.password}
						onChange={handleChange}
					/>
					<button>Log in</button>
				</form>
			</div>
		</>
	);
};

export default Login;
