import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Styled from "styled-components";

const SectionContainer = Styled.div`
padding: 2%;
margin: 0 auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 80vw;
background-color: white;
border-radius:15px;

input[type="text"] {
	display:inline;
    text-align: center;
	border: 1px solid lightgray;
	border-right:0;
    border-radius: 10px 0 0 10px;
    height: 2rem;
    width:100%;
    background-color: #ffffff;
    font-size: 1.2rem;
    padding-left: 5%;
	}
	
	input[type="text"]:focus {
outline:none;
	}

button{
display:inline;
border: 1px solid lightgray;
border-left: 0;
border-radius: 0 10px 10px 0;
background-color: #3184ed;
color: white;
}

form {
	display: flex;
	/* border: 2px solid red; */
	width: 500px;
}
`;

const initialValues = {
	comment: "",
};

export default function CommentSection(props) {
	const { issue } = props;
	const [comments, addComments] = useState([]);
	const [formValues, setFormValues] = useState(initialValues);

	// console.log("comments in comSection", comments);
	// console.log("issue in comSection", issue);

	const getComments = () => {
		axiosWithAuth()
			.get(`/api/issues/${issue.issueId}/comments`)
			.then((response) => {
				// console.log("getComments response", response.data);
				addComments(response.data);
			});
	};

	useEffect(() => {
		getComments();
	}, []);

	const submitComment = (event) => {
		event.preventDefault();
		axiosWithAuth()
			.post(`/api/issues/${issue.issueId}/comments`, { comment: formValues.comment })
			.then((response) => {
				// console.log("comment response", response);
				getComments();
				setFormValues(initialValues);
			})
			.catch((error) => {
				// console.log(error.response.data);
				alert(`Oops.. Looks like there was an error. ${error.response.data.message}`);
			});
	};

	const inputChange = (event) => {
		event.persist();
		setFormValues({ ...formValues, [event.target.name]: event.target.value });
	};

	return (
		<SectionContainer>
			<form onSubmit={submitComment}>
				<input
					type="text"
					name="comment"
					placeholder="comment.."
					value={formValues.comment}
					onChange={inputChange}
				/>
				<button onClick={submitComment}>send</button>
			</form>
			<div>
				<div>
					{comments &&
						comments.map((comment) => {
							// console.log("comments on map", comments);
							return (
								<p>
									{comment.comment} <hr />
								</p>
							);
						})}{" "}
				</div>
			</div>
		</SectionContainer>
	);
}
