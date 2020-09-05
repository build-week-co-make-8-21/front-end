import React, { useEffect } from "react";
import Styled from "styled-components";
import ls from "local-storage";

const UpvoteDiv = Styled.div`
button {
    width: 100px;
    height: 1.6rem;
    border-radius: 7px;
    background-color: #3184ed;
    font-weight: 500;
    color: white;
    border: unset;
    cursor: pointer;
}
`;

export default function Upvote(props) {
	const { upvote, setUpvote, id } = props;

	const upvotePost = (event) => {
		event.preventDefault();
		let newCount = 1 + upvote;
		setUpvote(newCount);
		ls.set(`upvote${id}`, newCount);
	};

	useEffect(() => {
		let upvoteCount = ls.get(`upvote${id}`);
		setUpvote(upvoteCount);
	}, [id, setUpvote]);

	return (
		<UpvoteDiv>
			<button type="button" onClick={upvotePost}>
				{" "}
				<i class="fas fa-arrow-circle-up"></i> Upvote <span> {upvote}</span>
			</button>
		</UpvoteDiv>
	);
}
