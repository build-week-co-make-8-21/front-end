import React, { useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, Link } from "react-router-dom";
import { FeedContext } from "../contexts/context";

import IssueCard from "./IssueCard";

const Feed = (props) => {
	const { issues, addIssues } = useContext(FeedContext);
	return (
		<div className="feed">
			<button>Add Issue</button>
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
