import React, { useState, useEffect, useContext } from "react";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { FeedContext } from "../contexts/context";
import { NavLink, useHistory } from "react-router-dom";
import Styled from "styled-components";

const FormContainer = Styled.div`
 display: flex;
 text-align: center;
 flex-direction: column;
 justify-content: center;
 background-color: white;
 border-radius: 15px;
 width: 500px;
 margin: 5% auto;
 h2{
     color: #3184ED;
 }
`;

const H6 = Styled.h6`
display: flex;
height: 2rem;
justify-content:center;
text-align: center;
align-items: center;
width: 3rem;
vertical-align: center;
margin:unset;
margin-left: 90%;
margin-top: 1%;
font-size: 16px;
`;

const TextArea = Styled.textarea`
width: 80%;
height: 200px;
`;

const Img = Styled.img`
object-fit: contain;
width: 80%;
height: 200px;
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
				console.log("formvalues", formValues);
				console.log("response", response);
				console.log("issues", issues);
				console.log("username", username);
				addIssues([response.data, ...issues]);
				setFormValues(initialFormValues);
				console.log(response.data);
				getIssues();
				history.push("/feed");
			})
			.catch((error) => {
				console.log(error.response.data);
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
			<H6>
				<NavLink to="/feed">
					<i class="fas fa-times"></i>
				</NavLink>
			</H6>
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
					<TextArea
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
				<div className="errors">
					<div className="titleError">{errors.imageURL}</div>
				</div>
				{formValues.imageURL !== null && formValues.imageURL !== "" ? (
					<Img alt={formValues.title} src={`${formValues.imageURL}`} />
				) : null}
				<br />
				<button type="submit" disabled={disabled} to="/feed">
					Post
				</button>
			</form>
		</FormContainer>
	);
}
