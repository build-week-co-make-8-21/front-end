import React from "react";
import Styled from "styled-components";

const CardContainer = Styled.div`
background-color: white;
border-radius: 15px;
width: 50vw;
padding: 3%;
margin: 1% auto;
`;

const ImageContainer = Styled.div`
object-fit: cover;
display: flex;
justify-content: center;
`;

export default function IssueCard(props) {
	const { issue } = props;
	console.log("from IssueCard", issue);
	return (
		<CardContainer>
			<ImageContainer>
				{issue.imageURL !== null && issue.imageURL !== "" ? (
					<img alt="issue pic" src={`${issue.imageURL}`} />
				) : null}
			</ImageContainer>

			<h2>{issue.title} </h2>
			<p>Category: {issue.categoryName}</p>
			{issue.username !== "" && issue.username !== null && issue.username !== undefined ? (
				<p>Posted by: {issue.username}</p>
			) : null}

			<p>Decription: {issue.description}</p>
		</CardContainer>
	);
}
