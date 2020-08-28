import React from "react";
import Styled from "styled-components";

const UpvoteDiv = Styled.div`
button {
    width: 100px;
    height: 1.6rem;
    border-radius: 7px;
    background-color: #3184ed;
    font-weight: 500;
    color: white;
    cursor: pointer;
    border: unset;
}
`;

export default function Upvote(props) {
	const { upvote, setUpvote } = props;

	const upvotePost = (event) => {
		event.preventDefault();
		let newCount = upvote;
		setUpvote(newCount + 1);
	};

	return (
		<UpvoteDiv>
			<button type="button" onClick={upvotePost}>
				{" "}
				<i class="fas fa-arrow-circle-up"></i> Upvote <span> {upvote}</span>
			</button>
		</UpvoteDiv>
	);
}
