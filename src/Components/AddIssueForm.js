import React, { useState, useEffect, useContext } from "react";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { FeedContext } from "../contexts/context";
import { NavLink, useHistory } from "react-router-dom";
import Styled from "styled-components";

const FormContainer = Styled.div`
	margin: 0 auto;
	margin-top: 150px;
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	background-color: white;
	border-radius: 15px;
	width: 500px;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
	@media (max-width: 450px) {
		margin-top: 80px;
		width: 95vw;
		border: 2px solid red;
    }

@keyframes wiggle {
		0% {
			transform: translateX(39deg);
		}
		10% {
			transform: translateX(-8deg);
		}
		20% {
			transform: skewX(37deg);
		}
		30% {
			transform: skewX(-6deg);
		}
		40% {
			transform: skewX(35deg);
		}
		50% {
			transform: skewX(-4deg);
		}
		60% {
			transform: skewX(33deg);
		}
		70% {
			transform: skewX(-2deg);
		}
		80% {
			transform: skewX(31deg);
		}
		90% {
			transform: skewX(0deg);
		}
		100% {
			transform: skewX(0deg);
		}
	}


h2 {
    color: #3184ED;
}

button {
    background-color: #3184ed;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100px;
    height: 2.6rem;
    border: unset;
    border-radius: 7px;
    font-weight: 500;
    margin: 3% auto;
    cursor: pointer;
}

button:hover {
	background-color: white;
	color: #3184ed;
	border: .5px solid #3184ed;
	cursor: pointer;
}

button:disabled {
	background-color: lightgray;
	color: white;
	border: unset;
	cursor: not-allowed;
}

button:disabled:hover {
	background-color: lightgray;
	color: white;
	border: unset;
	cursor: not-allowed;
}

form div div.titleError {
	color: crimson;
	animation-name: wiggle;
	animation-timing-function: ease-in;
	animation-duration: 1s;
	animation-iteration-count: 10;
}

p {
	display: flex;
	height: 2rem;
	justify-content: center;
	text-align: center;
	align-items: center;
	width: 3rem;
	vertical-align: center;
	margin: unset;
	margin-left: 90%;
	margin-top: 1%;
	font-size: 16px;
}

i {
	font-size: 1.5rem;
	margin-right: .5rem;
}

i:hover {
	color: crimson;
}

textarea[type="text"] {
	width: 80%;
	height: 200px;
	@media (max-width: 450px) {
		font-size: 16px;
		padding: 1%;
		margin: .5%;
    }
}

input[type="text"], select, option {
	@media (max-width: 450px) {
		font-size: 16px;
		padding: 1%;
		margin: .5%;
    }
}

input[type="text"] {
	@media (max-width: 450px) {
		width: 70%
    }
}

select, option {
	@media (max-width: 450px) {
		width: 80%
    }
}

img {
	object-fit: contain;
	width: 80%;
	height: 200px;
}

input[name="imageURL"] {
	width: 70%;
	@media (max-width: 450px) {
		width: 67.5%
    }
}
button[type="submit"] {
	font-size: 1rem;
}
`;

const formSchema = yup.object().shape({
	title: yup
		.string()
		.min(3, "Title must be atleast 3 character")
		.required("A title for your issue is required"),
	categoryId: yup.string().required("Please select category."),
	description: yup.string().required("Description cannot be empty."),
	imageURL: yup.string().url("Must be a valid url"),
});

const initialDisabled = true;

export default function AddIssuesForm() {
	const { issues, addIssues, username, getIssues } = useContext(FeedContext);
	const initialFormValues = {
		title: "",
		categoryId: "",
		description: "",
		imageURL: "",
		username: username,
	};
	const initialFormErrors = {
		title: "",
		categoryId: "",
		description: "",
		imageURL: "",
		username: username,
	};
	const [errors, setErrors] = useState(initialFormErrors);
	const [formValues, setFormValues] = useState(initialFormValues);
	const [disabled, setDisabled] = useState(initialDisabled);
	const history = useHistory();

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
		axiosWithAuth()
			.post("/api/issues", {
				title: formValues.title,
				categoryId: formValues.categoryId,
				description: formValues.description,
				imageURL: formValues.imageURL,
				username: username,
			})
			.then((response) => {
				// console.log("formvalues", formValues);
				// console.log("response", response);
				// console.log("issues", issues);
				// console.log("username", username);
				addIssues([response.data, ...issues]);
				setFormValues(initialFormValues);
				// console.log(response.data);
				getIssues();
				history.push("/feed");
				// alert("Post successful!");
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
		<FormContainer>
			<p>
				<NavLink to="/feed">
					<i className="fas fa-times"></i>
				</NavLink>
			</p>
			<form onSubmit={formSubmit}>
				<h2>Add New Post</h2>
				<label htmlFor="title">
					{" "}
					Title:&nbsp;
					<input
						type="text"
						name="title"
						value={formValues.title}
						placeholder="What should we call this?"
						onChange={inputChange}
					/>
				</label>
				<div className="errors">
					<div className="titleError">{errors.title}</div>
				</div>
				<label htmlFor="category">
					<select onChange={inputChange} value={formValues.categoryId} name="categoryId">
						<option value="" default disabled>
							Category
						</option>
						<option value={1}>Yard and Lawn</option>
						<option value={2}>Community Activities</option>
						<option value={3}>Crime & Safety</option>
						<option value={4}>Lost & Found</option>
						<option value={5}>Recommendation</option>
						<option value={6}>Flooding</option>
						<option value={7}>General</option>
						<option value={8}>Announcements</option>
						<option value={9}>Pets</option>
						<option value={10}>Road Closure & Transportation</option>
						<option value={11}>School & Education</option>
						<option value={12}>Holiday</option>
						<option value={13}>Utilities</option>
					</select>
				</label>
				<div className="errors">
					<div className="titleError">{errors.categoryName}</div>
				</div>
				<label htmlFor="description">
					<textarea
						type="text"
						name="description"
						value={formValues.description}
						placeholder="description..."
						onChange={inputChange}
					/>
				</label>
				<div className="errors">
					<div className="titleError">{errors.description}</div>
				</div>
				<label htmlFor="imageURL">
					{" "}
					Image:&nbsp;
					<input
						type="text"
						name="imageURL"
						value={formValues.imageURL}
						placeholder="Enter URL of image"
						onChange={inputChange}
					/>
				</label>
				<br />
				<div className="errors">
					<div className="titleError">{errors.imageURL}</div>
				</div>
				<br />
				{formValues.imageURL !== null && formValues.imageURL !== "" ? (
					<img alt={formValues.title} src={`${formValues.imageURL}`} />
				) : null}
				<br />
				<button type="submit" disabled={disabled} to="/feed">
					Post
				</button>
			</form>
		</FormContainer>
	);
}
