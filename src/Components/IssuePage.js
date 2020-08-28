import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { FeedContext } from "../contexts/context";
import imagedefault from "../Assets/photo_gallery.jpg";
import Styled from "styled-components";
import Upvote from "./Upvote";
import CommentSection from "./CommentSection";

const PageContainer = Styled.div`
 margin: 5% auto;
 margin-top: 150px;
`;

const IssueContainer = Styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 background-color: white;
 border-radius: 15px;
 width: 80%;
 margin: 5% auto;
 margin-top: 0%;
 padding: 3%;

.category, .description, h1 {
    text-align: center;
    /* border: 2px solid red; */
};

.category {
    margin-top: unset;
}

.description {
    margin: 2% auto;
}

p.descriptionLabel {
    text-decoration: italic;
    color: grey;
}

h1 {
    margin-bottom: unset;
 }

 #delete {
     width: 60px;
     background-color: unset;
     border: unset;
     font-size: 2.5rem;
     color: black;
     position: static;
     top: 0%;
     right: 0%;
     margin: 0;
 }

 #delete:hover {
     color: crimson;
 }

 #edit {
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
    border: unset;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 1%;

#edit:disabled {
    background-color: lightgray;
};

#edit:hover {
    background-color: white;
    color: #3184ed;
};
 };
`;

const Back = Styled.div`
width: 60px;
margin-left: 10%;
margin-top: 4%;
margin-bottom: .5%;
`;

const ImageContainer = Styled.div`
display: flex;
box-sizing: border-box;
height: 50vh;
justify-content: center;
margin: 0 auto;
`;

const Img = Styled.img`
object-fit: contain;
width: 50vw;
border-radius: 10px;
/* border: 2px solid green; */
margin-top: 0%;
`;

export default function IssuePage(props) {
	const { issue } = props;
	const { getIssues } = useContext(FeedContext);
	const history = useHistory();
	const [upvote, setUpvote] = useState(0);

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
		<PageContainer>
			<Back>
				<Link to="/feed">
					<i className="fas fa-chevron-left"></i>
					&nbsp;Back
				</Link>
			</Back>

			<IssueContainer>
				<button type="button" id="delete" onClick={() => deleteIssue(issue.issueId)}>
					<i className="far fa-trash-alt"></i>
				</button>
				<ImageContainer>
					{issue.imageURL !== null && issue.imageURL !== "" ? (
						<Img alt="issue pic" src={`${issue.imageURL}`} />
					) : (
						<Img alt="default" src={imagedefault} />
					)}
				</ImageContainer>
				<h1>{issue.title} </h1>
				<div className="category">{issue.categoryName}</div>
				{issue.username !== "" && issue.username !== null && issue.username !== undefined ? (
					<p>Posted by: {issue.username}</p>
				) : null}
				<Upvote upvote={upvote} setUpvote={setUpvote} />
				<div className="description">
					<p className="descriptionLabel">Description</p> {issue.description}
				</div>
				<button type="button" id="edit" onClick={editIssue}>
					Edit
				</button>
			</IssueContainer>

			<div className="comments-container">
				<CommentSection issue={issue} />
			</div>
		</PageContainer>
	);
}
