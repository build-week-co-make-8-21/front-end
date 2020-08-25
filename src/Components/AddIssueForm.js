import React, { useState, useEffect, useContext } from "react";
import * as yup from "yup";
import newRecipe from "../validation/newRecipe";
import Form from "./createPostForm";
import axiosWithAuth from "../util/axiosWithAuth";

import { FeedContext } from "../contexts/context";

const formSchema = yup.object().shape({
	title: yup
		.string()
		.min(3, "Title must be atleast 3 character")
		.required("A title for your issue is required"),
	category: yup.string().required("Please select a category"),
	imageURL: yup.string().url("Must be a valid url"),
});

const initialFormValues = {
	title: "",
	category: "",
	imageURL: "",
};
const initialFormErrors = {
	title: "",
	category: "",
	imageURL: "",
};
const initialDisabled = true;
const { issues, addIssues } = useContext(FeedContext);
const CreatePost = () => {
	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(initialDisabled);

	const postNewIssue = (newIssue) => {
		axiosWithAuth()
			.post("/api/issues", newIssue)
			.then((response) => {
				addIssues([response.data, ...issues]);
				setFormValues(initialFormValues);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
				debugger;
			});
	};

	const inputChange = (name, value) => {
		yup
			.reach(newRecipe, name)
			.validate(value)
			.then((valid) => {
				setFormErrors({
					...formErrors,
					[name]: "",
				});
			})
			.catch((err) => {
				setFormErrors({
					...formErrors,
					[name]: err.errors[0],
				});
			});
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	useEffect(() => {
		newRecipe.isValid(formValues).then((valid) => {
			setDisabled(!valid);
		});
	}, [formValues]);

	return (
		<div>
			<form onSubmit={submit}>
				<h2>Add Your Recipe!</h2>
				<div className="errors">
					<div id="titleError">{formErrors.name}</div>
				</div>
				<label htmlFor="title">
					<input
						type="text"
						name="name"
						value={formValues.name}
						placeholder="Enter name of recipe"
						onChange={onInputChange}
					></input>
				</label>
				<div className="errors">
					<div id="titleError">{formErrors.source}</div>
				</div>
				<label htmlFor="source">
					<input
						type="text"
						name="source"
						value={formValues.source}
						placeholder="Enter source of recipe"
						onChange={onInputChange}
					></input>
				</label>
				<div className="errors">
					<div id="titleError">{formErrors.imageURL}</div>
				</div>
				<label htmlFor="imgSRC">
					<input
						type="text"
						name="imageURL"
						value={formValues.imageURL}
						placeholder="Enter URL of image"
						onChange={onInputChange}
					></input>
				</label>
				<div className="errors">
					<div id="titleError">{formErrors.category}</div>
				</div>
				<label htmlFor="category">
					<select onChange={onInputChange} value={formValues.category} name="category">
						<option value="">Food category</option>
						<option value="Pizza">Pizza</option>
						<option value="Sandwich">Sandwich</option>
						<option value="Pasta">Pasta</option>
						<option value="Rice">Rice</option>
						<option value="Meat">Meat</option>
						<option value="Vegan">Vegan</option>
						<option value="Festive">Festive</option>
						<option value="Breakfast">Breakfast</option>
						<option value="Lunch">Lunch</option>
						<option value="Dinner">Dinner</option>
						<option value="Snack">Snack</option>
					</select>
				</label>

				<button onSubmit={submit} id="submitBtn">
					Add Recipe
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
