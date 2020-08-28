import React, { useContext } from "react";
import { FeedContext } from "../contexts/context";
import Styled from "styled-components";

const SearchField = Styled.div`
	align-self: center;

input[type="text"] {
	border-radius: 5px;
	border: .5px solid lightgray;
	height: 1.6rem;
	width: 250px;
}

input[type="text"]:focus {
	outline: none;
}
`;

export default function SearchBar() {
	const { searchValue, setSearchValue } = useContext(FeedContext);
	const onInputChange = (event) => {
		const { value } = event.target;
		setSearchValue(value);
	};
	return (
		<SearchField>
			<form>
				<input type="text" placeholder="🔎" value={searchValue} onChange={onInputChange} />
			</form>
		</SearchField>
	);
}
