import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import { FeedContext } from "../contexts/context";

const formSchema = yup.object().shape({
	username: yup.string().min(3, "Username must be at least 3 characters").required(),
	password: yup.string().required("Password is required"),
});

const initialFormValues = {
	username: "",
	password: "",
};
const initialErrors = {
	username: "",
	password: "",
};
const initialDisabled = true;

function Login() {
	const { setUsername } = useContext(FeedContext);
	const [credentials, setCredentials] = useState(initialFormValues);
	const [errors, setErrors] = useState(initialErrors);
	const [buttonDisabled, setButtonDisabled] = useState(initialDisabled);
	const { push } = useHistory();

	useEffect(() => {
		formSchema.isValid(credentials).then((valid) => {
			setButtonDisabled(!valid);
		});
	}, [credentials]);

	const validateChange = (event) => {
		yup
			.reach(formSchema, event.target.name)
			.validate(event.target.value)
			.then(() => {
				setErrors({
					...errors,
					[event.target.name]: "",
				});
			})
			.catch((error) => {
				setErrors({
					...errors,
					[event.target.name]: error.errors,
				});
			});
	};

	const handleChange = (event) => {
		event.persist();
		validateChange(event);
		setCredentials({ ...credentials, [event.target.name]: event.target.value });
	};

	// make a post request to retrieve a token from the api
	const onSubmit = (event) => {
		event.preventDefault();
		axiosWithAuth()
			.post("/login", credentials)
			.then((response) => {
				localStorage.setItem("token", response.data.token);
				push("/feed");
				setUsername(credentials.username);
				setCredentials(initialFormValues);
			})
			.catch((error) => {
				console.log("Error:", error.response.data);
				alert(`Oops.. Looks like there was an error. ${error.response.data.message}`);
			});
	};
	// when you have handled the token, navigate to the BubblePage route
	return (
		<>
			<div className="login-div">
				<h2>Login</h2>
				<form className="login-form" onSubmit={onSubmit}>
					<label htmlFor="username">Username/Email:</label>
					<input
						type="text"
						name="username"
						placeholder="username"
						value={credentials.username}
						onChange={handleChange}
					/>
					{errors.username.length < 0 ? <p className="error">{errors.username}</p> : null}
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						placeholder="password"
						value={credentials.password}
						onChange={handleChange}
					/>
					<button disabled={buttonDisabled} name="submit">
						Log in
					</button>
				</form>
			</div>
		</>
	);
}

export default Login;
