import React, { useContext, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { FeedContext } from "../contexts/context";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import IssueCard from "./IssueCard";

const Feed = () => {
	const { issues, getIssues } = useContext(FeedContext);

	const params = useParams();
	const id = params.id;

	useEffect(() => {
		axiosWithAuth()
			.get(`/api/issues/4`)
			.then((response) => {
				console.log("get edit response data", response);
			})
			.catch((error) => {
				console.log(error.response.data);
				alert(`Oops.. Looks like there was an error. ${error.response.data.message}`);
			});
	});

	return (
		<div className="feed">
			<NavLink to="/create">
				<button>Add Issue</button>
			</NavLink>
			{issues &&
				issues.map((issue) => {
					return (
						<Link style={{ textDecoration: "none" }} to={`/issues/${issue.issueId}`}>
							<IssueCard issue={issue} />
						</Link>
					);
				})}
		</div>
	);
};
export default Feed;
