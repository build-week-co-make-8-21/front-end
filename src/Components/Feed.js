import React, { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FeedContext } from "../contexts/context";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import IssueCard from "./IssueCard";

const Feed = () => {
	const { issues } = useContext(FeedContext);

	// useEffect(() => {
	// 	axiosWithAuth()
	// 		.get("/api/categories")
	// 		.then((response) => {
	// 			console.log(response);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error.response.data);
	// 			alert(`Oops.. Looks like there was an error. ${error.response.data.message}`);
	// 		});
	// });

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
