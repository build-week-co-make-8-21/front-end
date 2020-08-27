import React, { useContext } from "react";
import { FeedContext } from "../contexts/context";

export default function SearchBar() {
	const { searchValue, setSearchValue } = useContext(FeedContext);
	const onInputChange = (event) => {
		const { value } = event.target;
		setSearchValue(value);
	};
	return (
		<div className="searchField">
			<form>
				<input type="text" placeholder="🔎" value={searchValue} onChange={onInputChange} />
				{/* <button type="submit" className="search-btn" onClick={onInputChange}>
					<img src={searchIcon} alt="search button" />
				</button> */}
			</form>
		</div>
	);
}
