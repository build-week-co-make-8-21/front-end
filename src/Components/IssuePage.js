import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { FeedContext } from "../contexts/context";
import imagedefault from "../Assets/photo_gallery.jpg";
import Styled from "styled-components";

const IssueContainer = Styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 background-color: white;
 border-radius: 15px;
 width: 80%;
 margin: 5% auto;
 margin-top: 0%;
`;

const Back = Styled.div`
width: 60px;
margin-left: 10%;
margin-top: 4%;
margin-bottom: .5%;
`;

const ImageContainer = Styled.div`
object-fit: cover;
display: flex;
justify-content: center;
margin: 5%;
`;

const Img = Styled.img`
border-radius: 10px;
`;

const H1 = Styled.h1`
    text-align: center;
    `;

export default function IssuePage(props) {
	const { issue } = props;
	const { getIssues } = useContext(FeedContext);
	const history = useHistory();

	const deleteIssue = (id) => {
		console.log(id);
		axiosWithAuth()
			.delete(`/api/issues/${id}`)
			.then(() => {
				getIssues();
				history.push("/feed");
			})
			.catch((error) => {
				console.log(error);
				alert(`error ${error.message}`);
			});
	};

	const editIssue = (event) => {
		event.preventDefault();
		history.push(`/editIssue/${issue.issueId}`);
	};

	return (
		<>
			<Back>
				<Link to="/feed">
					<i class="fas fa-chevron-left"></i>
					&nbsp;Back
				</Link>
			</Back>

			<IssueContainer>
				<ImageContainer>
					{issue.imageURL !== null && issue.imageURL !== "" ? (
						<Img alt="issue pic" src={`${issue.imageURL}`} />
					) : (
						<Img alt="default" src={imagedefault} />
					)}
				</ImageContainer>
				<H1>{issue.title} </H1>
				<div>Category: {issue.categoryName}</div>
				{issue.username !== "" && issue.username !== null && issue.username !== undefined ? (
					<p>Posted by: {issue.username}</p>
				) : null}
				<div>Description: {issue.description}</div>
				<button type="button" id="edit" onClick={editIssue}>
					Edit
				</button>
				<button type="button" id="delete" onClick={() => deleteIssue(issue.issueId)}>
					Delete
				</button>
			</IssueContainer>
		</>
	);
}
