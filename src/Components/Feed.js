import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { FeedContext } from "../contexts/context";
import Styled from "styled-components";
import IssueCard from "./IssueCard";
import avatar from "../Assets/avatar-default-200.png";

const FeedContainer = Styled.div`
	margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
	align-items: center;
	@media (max-width: 450px) {
		margin-top: 70px;
	}

span {
	font-weight: 600;
}

.create {
	box-sizing: border-box;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: white;
	border-radius: 15px;
	width: 50vw;
	height: 5rem;
	margin-bottom: 3%;
	margin-top: 5%;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
	@media (max-width: 450px) {
		width: 95vw;
		margin-top: 1%;
    }
}

img.create-avatar {
	border-radius: 50%;
	height: 3rem;
	margin-right: 10px;
	margin-left: 30px;
}
`;

export default function Feed() {
	const { issues, searchValue } = useContext(FeedContext);
	// console.log("username in Feed", username);
	// console.log("searchValue in Feed", searchValue);

	return (
		<FeedContainer>
			<NavLink to="/create">
				<div className="create">
					<img className="create-avatar" src={avatar} alt="default avatar" />
					<p>
						Post a <span>message</span>, <span>event</span> or <span>alert</span> to your
						neighborhood
					</p>
				</div>
			</NavLink>
			{issues &&
				issues
					.filter((issue) => {
						// console.log("issue in filter", issue);
						return (
							issue.categoryName.toLowerCase().includes(searchValue.toLowerCase()) ||
							// issue.username.toLowerCase().includes(searchValue.toLowerCase()) ||
							issue.title.toLowerCase().includes(searchValue.toLowerCase()) ||
							issue.description.toLowerCase().includes(searchValue.toLowerCase())
						);
					})
					.map((issue) => {
						return (
							<Link style={{ textDecoration: "none" }} to={`/issues/${issue.issueId}`}>
								<IssueCard issue={issue} />
							</Link>
						);
					})}
		</FeedContainer>
	);
}
