import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import Styled from "styled-components";

const SignUpDiv = Styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 150px;
	text-align: center;
	@media (max-width: 450px) {
		margin-top: 95px;
    }

button {
    width: 100px;
    height: 2.6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 7px;
    background-color: #3184ed;
	font-weight: 500;
	font-size: 1rem;
    color: white;
    cursor: pointer;
    margin: 2% auto;
    border: unset;
}

button:hover  {
	background-color: white;
	color: #3184ed;
	cursor: pointer;
    };

button:disabled  {
		background-color: lightgray;
		cursor: not-allowed;
	};

button:disabled:hover  {
		background-color: lightgray;
		cursor: not-allowed;
		color: white;
	};

input[type="text"], input[type="password"], input[type="email"], input[type="tel"] {
    text-align: center;
    border: unset;
    border-radius: 10px;
    height: 2rem;
    background-color: #ffffff;
    font-size: 1.2rem;
	margin: unset;
	}

.already-registered-div {
	display: flex;
	justify-content: center;
}

p.already-registered {
    font-size: .8rem;
	color: crimson;
	position: absolute;
	z-index: 0;
	justify-self: center;
	align-items: center;
	margin: auto 0;
}
p.already-registered:hover {
    font-size: 1rem;
    color: #3184ed;
}

p.form-terms-text {
	font-size: .8rem;
    color: gray;
}

.errors {
	font-size: .9rem;
}

.titleError {
	color: crimson;
	margin: 0 auto;
}


h2 {
	color: #3184ed;
}
`;

const formSchema = yup.object().shape({
	username: yup.string().min(3, "Username must be at least 3 characters").required(),
	email: yup.string().email("Must be a valid Email").required(),
	phoneNumber: yup.number().min(10, "Must be a valid Phone Number. e.g. 3101234567"),
	password: yup
		.string()
		.min(6, "Username must be at least 6 characters")
		.required("Password is required"),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref("password"), null], "Password must match")
		.required("Password is required"),
});

const initialFormValues = {
	username: "",
	email: "",
	phoneNumber: "",
	passwordConfirmation: "",
};
const initialErrors = {
	username: "",
	email: "",
	phoneNumber: "",
	password: "",
	passwordConfirmation: "",
};

const initialDisabled = true;

export default function Signup() {
	const [formValues, setFormValues] = useState(initialFormValues);
	const [errors, setErrors] = useState(initialErrors);
	const [disabled, setDisabled] = useState(initialDisabled);
	const { push } = useHistory();

	useEffect(() => {
		formSchema.isValid(formValues).then((valid) => {
			setDisabled(!valid);
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
				// console.log("success");
				setFormValues(initialFormValues);
				push("/login");
			})
			.catch((error) => {
				// console.log(error.response.data);
				alert(`Oops.. Looks like there was an error. ${error.response.data.message}`);
			});
	};

	const inputChange = (event) => {
		event.persist();
		validateChange(event);
		setFormValues({ ...formValues, [event.target.name]: event.target.value });
	};

	return (
		<SignUpDiv>
			<h2> Sign Up </h2>
			<form onSubmit={formSubmit}>
				<label className="reg-label" htmlFor="username">
					Username&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input
					type="text"
					name="username"
					value={formValues.username}
					onChange={inputChange}
				/>
				<br />
				<div className="errors">
					<div className="titleError">{errors.username}</div>
				</div>
				<br />
				<label className="signup-label" htmlFor="email">
					Email&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input type="email" name="email" value={formValues.email} onChange={inputChange} />
				<br />
				<div className="errors">
					<div className="titleError">{errors.email}</div>
				</div>
				<br />
				<label className="signup-label" htmlFor="phoneNumber">
					Phone&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input
					type="tel"
					name="phoneNumber"
					value={formValues.phoneNumber}
					onChange={inputChange}
				/>
				<br />
				<div className="errors">
					<div className="titleError">{errors.phoneNumber}</div>
				</div>
				<br />
				<label className="reg-label" htmlFor="password">
					Password&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input
					type="password"
					name="password"
					value={formValues.password}
					onChange={inputChange}
				/>
				<br />
				<div className="titleError">{errors.password}</div>
				<label className="signup-label" htmlFor="passwordConfirmation">
					Confirm Password&nbsp;&nbsp;&nbsp;
				</label>
				<br />
				<input type="password" name="passwordConfirmation" onChange={inputChange} /> <br />
				<br />
				{formValues.passwordConfirmation !== formValues.password ? (
					<div className="titleError">{errors.passwordConfirmation}</div>
				) : null}
				<p className="form-terms-text">
					By clicking on the register button you agree with Co-Make App <br /> Terms &
					Conditions, Fair Use, forever and ever so help you God.
				</p>
				<button disabled={disabled} name="submit">
					Sign Up
				</button>
			</form>
			<Link className="already-registered-div" to="/login">
				<p className="already-registered">Already Registered?</p>
			</Link>
		</SignUpDiv>
	);
}
