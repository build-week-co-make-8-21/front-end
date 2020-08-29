import React from "react";
import logo from "../Assets/logo2.png";
import { NavLink, useHistory } from "react-router-dom";
import Styled from "styled-components";
import SearchBar from "./SearchBar";
import BurgerMenu from "./BurgerMenu";

const ContainerDiv = Styled.nav`
	box-sizing: border-box;
	width:100vw;
	background-color: white;
	position: fixed;
	top: 0%;

.header {
	width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-top: 2%;
    padding-bottom: 2%;
}

.links {
	display: flex;
    justify-content: space-between;
    align-items: center;
    width: 25%;
	display: flex;
	@media (max-width: 450px) {
		display: none;
	}
}

.search-logout {
	display:flex;
	justify-content: space-between;
	align-items: center;
	width: 400px;
	@media (max-width: 450px) {
		display: none;
	}

}

.logout {
	width: 100px;
    height: 2.6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 7px;
    background-color: #3184ed;
    font-weight: 500;
	color: white;
	margin-left: 5%
}

.logout:hover {
	border: .5px solid #3184ed;
    background-color: white;
    color: #3184ed;
    cursor: pointer;
}

a:hover {
	color: #3184ed;
}

`;

export default function Header() {
	const history = useHistory();
	const logout = () => {
		localStorage.clear("token");
		history.push("/");
	};

	return (
		<ContainerDiv>
			<div className="header">
				<NavLink to="/feed">
					<img src={logo} className="logo-img" alt="Logo" />
				</NavLink>
				<div className="links">
					<a href="https://comakeapp.now.sh/feed">Home</a>
					<a href="https://jovial-austin-69da22.netlify.app/about.html">About</a>
					<a href="https://jovial-austin-69da22.netlify.app/team.html">Team</a>
				</div>
				<BurgerMenu />
				<div className="search-logout">
					<SearchBar />
					<div className="logout">
						<span type="button" onClick={logout}>
							Logout
						</span>
					</div>
				</div>
			</div>
		</ContainerDiv>
	);
}
