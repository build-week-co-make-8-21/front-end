import React, { useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { FeedContext } from "../contexts/context";

export default function IssuePage(props) {
	const { issue } = props;
	const { getIssues } = useContext(FeedContext);
	const history = useHistory();

	// useEffect(() => {
	// 	console.log("its working!");
	// 	axiosWithAuth()
	// 		.get(`/issues/${issue.issueId}`)
	// 		.then((response) => {
	// 			console.log(response);
	// 		});
	// }, [issue.issueId]);

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
