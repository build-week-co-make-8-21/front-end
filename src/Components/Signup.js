import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

import logo from "../Assets/co-make-logo-v2.png";

const formSchema = yup.object().shape({
	username: yup.string().min(3, "Username must be at least 3 characters").required(),
	email: yup.string().email("Must be a valid Email").required(),
	phoneNumber: yup.number().min(10, "Must be a valid Phone Number"),
	password: yup.string().required("Password is required").required(),
	passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "Password must match"),
});

const initialFormValues = {
	username: "",
	email: "",
	phoneNumber: "",
	password: "",
};
const initialErrors = {
	username: "",
	email: "",
	phoneNumber: "",
	password: "",
};
const initialDisabled = true;

export default function Signup() {
	const [formValues, setFormValues] = useState(initialFormValues);
	const [errors, setErrors] = useState(initialErrors);
	const [buttonDisabled, setButtonDisabled] = useState(initialDisabled);
	const { push } = useHistory();

	useEffect(() => {
		formSchema.isValid(formValues).then((valid) => {
			setButtonDisabled(!valid);
		});
	}, [formValues]);

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

	const formSubmit = (event) => {
		event.preventDefault();
		axios
			.post("https://bw-co-make-8-21.herokuapp.com/signup", {
				username: formValues.username,
				email: formValues.email,
				phoneNumber: formValues.phoneNumber,
				password: formValues.password,
			})
			.then(() => {
				console.log("success");
				setFormValues(initialFormValues);
				push("/login");
			})
			.catch((error) => {
				console.log(error.response.data);
				alert(`Oops.. Looks like there was an error. ${error.response.data.message}`);
			});
	};

	const inputChange = (event) => {
		event.persist();
		validateChange(event);
		setFormValues(...formValues, ([event.target.name]: event.target.value));
	};

	return (
		<>
			<div className="signup-header">
				<div className="header-logo">
					{" "}
					<img src={logo} alt="logo" />
				</div>
			</div>
			<div className="signup-form-contianer">
				<h2> SIGNUP </h2>
				<form onSubmit={formSubmit}>
					<div className="label-input-group">
						<label className="reg-label" htmlFor="username">
							Username&nbsp;&nbsp;&nbsp;
						</label>
						<input
							type="text"
							name="username"
							value={formValues.username}
							onChange={inputChange}
						/>
						<br />
					</div>
					{errors.username.length < 0 ? <p className="error">{errors.username}</p> : null}
					<br />
					<div className="label-input-group">
						<label className="signup-label" htmlFor="email">
							Email&nbsp;&nbsp;&nbsp;
						</label>
						<input type="email" name="email" value={formValues.email} onChange={inputChange} />
						<br />
					</div>
					{errors.email.length < 0 ? <p className="error">{errors.email}</p> : null}
					<br />
					<div className="label-input-group">
						<label className="signup-label" htmlFor="phoneNumber">
							Phone&nbsp;&nbsp;&nbsp;
						</label>
						<input
							type="tel"
							name="phoneNumber"
							value={formValues.phoneNumber}
							onChange={inputChange}
						/>
						<br />
					</div>
					{errors.phoneNumber.length < 0 ? (
						<p className="error">{errors.phoneNumber}</p>
					) : null}
					<br />
					<div className="label-input-group">
						<label className="reg-label" htmlFor="password">
							Password&nbsp;&nbsp;&nbsp;
						</label>
						<input
							type="password"
							name="password"
							value={formValues.password}
							onChange={inputChange}
						/>
					</div>
					<br />
					<div className="label-input-group">
						<label className="signup-label" htmlFor="passwordConfirmation">
							Confirm Password&nbsp;&nbsp;&nbsp;
						</label>
						<input type="password" name="passwordConfirmation" onChange={inputChange} /> <br />
					</div>
					{formValues.passwordConfirmation !== formValues.password ? (
						<p className="error">{errors.passwordConfirmation}</p>
					) : null}
					<p className="form-terms-text">
						By clicking on the register button you agree with Co-Make App Terms & Conditions,
						Fair Use, forever and ever so help you God.
					</p>
					<button disabled={buttonDisabled} name="submit">
						SIGNUP
					</button>
				</form>

				<a className="already-text" href="/login">
					Already Registered?
				</a>
			</div>
		</>
	);
}
