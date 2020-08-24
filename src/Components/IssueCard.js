import React from "react";

export default function IssueCard(props) {
	const { issue } = props;
	return (
		<div>
			<div id="image-container">
				<img alt="issue pic" src={issue.imageURL} />
			</div>
			<h2>{issue.title} </h2>
			<p>Category: {issue.categoryId}</p>
			<p>Posted by: {issue.userId}</p>
			<p>Decription: {issue.description}</p>
		</div>
	);
}
