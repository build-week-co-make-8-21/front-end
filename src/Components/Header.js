import React from "react";
import logo from "../Assets/logo2.png";
import { NavLink, useHistory } from "react-router-dom";
import Styled from "styled-components";
import SearchBar from "./SearchBar";

const ContainerDiv = Styled.nav`
width:100vw;
background-color: white;
position: fixed;
top: 0%;
`;

const HeaderDiv = Styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-top: 2%;
    padding-bottom: 2%;
`;

const Links = Styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 25%;
    display: flex;
`;

const Logout = Styled.nav`
    width: 8%;
    height: 2.6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 7px;
    background-color: #3184ed;
    font-weight: 500;
    color: white;
    cursor: pointer;
`;

export default function Header() {
	const history = useHistory();
	const logout = () => {
		localStorage.clear("token");
		history.push("/");
	};

	return (
		<ContainerDiv>
			<HeaderDiv>
				<NavLink to="/feed">
					<img src={logo} className="logo-img" alt="Logo" />
				</NavLink>
				<Links>
					<a href="https://jovial-austin-69da22.netlify.app/index.html">Home</a>
					<a href="https://jovial-austin-69da22.netlify.app/about.html">About</a>
					<a href="https://jovial-austin-69da22.netlify.app/team.html">Team</a>
				</Links>
				<SearchBar />
				<Logout>
					<span type="button" onClick={logout}>
						Logout
					</span>
				</Logout>
			</HeaderDiv>
		</ContainerDiv>
	);
}
