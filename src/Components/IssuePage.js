import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function RecipePage(props) {
	const { issue } = props;
	const history = useHistory();

	useEffect(() => {
		console.log("its working!");
		axiosWithAuth()
			.get(`/issues/${issue.issueId}`)
			.then((response) => {
				console.log(response);
			});
	}, []);

	const deleteIssue = (id) => {
		axiosWithAuth()
			.delete(`api/issues/${id}`)
			.then(() => {
				history.push("/feed");
			});
	};

	return (
		<div>
			<div id="image-container">
				<img alt="issue pic" src={issue.imageURL} />
			</div>
			<div>{issue.title} </div>
			<div>Category: {issue.categoryName}</div>
			<div>Posted By: {issue.username}</div>
			<Link to={`/editIssue/${issue.issueId}`}>Edit Issue</Link>
			<button type="button" id="delete" onClick={() => deleteIssue(issue.issueId)}>
				Delete Issue
			</button>
		</div>
	);
}
