import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, Link } from "react-router-dom";
import * as yup from "yup";
import Styled from "styled-components";

import { FeedContext } from "../contexts/context";

const LoginDiv = Styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 150px;
text-align: center;
button.loginBtn {
    width: 100px;
    height: 2.6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 7px;
    background-color: #3184ed;
    font-weight: 500;
    color: white;
    cursor: pointer;
    margin: 10% auto;
    border: unset;
}
button.loginBtn:disabled {
        background-color: lightgray;
    };

input[type="text"], input[type="password"] {
    text-align: center;
    border: unset;
    border-radius: 10px;
    height: 2rem;
    width:100%;
    background-color: #ffffff;
    font-size: 1.2rem;
    padding-left: 5%;
    }
.titleError {
	color: crimson;
}
p.sign-up {
    font-size: 1rem;
    color: crimson;
}
p.sign-up:hover {
    font-size: 1rem;
    color: #3184ed;
}
`;

const formSchema = yup.object().shape({
	username: yup.string().min(3, "Username must be at least 3 characters").required(),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
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

export default function Login() {
	const { setUsername, getIssues } = useContext(FeedContext);
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
				getIssues();
			})
			.catch((error) => {
				console.log("Error:", error.response.data);
				alert(`Oops.. Looks like there was an error. ${error.response.data.message}`);
			});
	};
	// when you have handled the token, navigate to the BubblePage route
	return (
		<>
			<LoginDiv>
				<h2>Login</h2>
				<form className="login-form" onSubmit={onSubmit}>
					<label htmlFor="username">Username/Email:</label>
					<br />
					<input
						type="text"
						name="username"
						placeholder="username or email"
						value={credentials.username}
						onChange={handleChange}
					/>
					<br />
					<div className="errors">
						<div className="titleError">{errors.username}</div>
					</div>
					<br />
					<label htmlFor="password">Password:</label>
					<br />
					<input
						type="password"
						name="password"
						placeholder="password"
						value={credentials.password}
						onChange={handleChange}
					/>
					<br />
					<div className="errors">
						<div className="titleError">{errors.password}</div>
					</div>
					<button className="loginBtn" disabled={buttonDisabled} name="submit">
						Log in
					</button>
					<Link to="/">
						<p className="sign-up"> Sign-up instead </p>
					</Link>
					<br />
				</form>
			</LoginDiv>
		</>
	);
}
