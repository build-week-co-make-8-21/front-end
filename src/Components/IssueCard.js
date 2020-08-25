import React from "react";

export default function IssueCard(props) {
	const { issue } = props;
	console.log(issue);
	return (
		<div>
			<div id="image-container">
				<img alt="issue pic" src={`${issue.imageURL}`} />
			</div>
			<h2>{issue.title} </h2>
			<p>Category: {issue.categoryName}</p>
			<p>Posted by: {issue.username}</p>
			<p>Decription: {issue.description}</p>
		</div>
	);
}
