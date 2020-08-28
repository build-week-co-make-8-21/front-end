import React from "react";
import logo from "../Assets/logo-white.png";
import { NavLink } from "react-router-dom";
import Styled from "styled-components";

const FooterContainer = Styled.div`
background: linear-gradient(to bottom, #56ccf2, #2f80ed);
    color: white;
    padding: 1% 0;
    position: relative;
    bottom:0%;
    margin-top: 10%

}

.innerDiv {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logo-icon {
    width: 64px;
    margin-bottom: 1.5%;
}

nav {
    width: 40%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    margin: 1.3% 0;
}

nav a {
    color: white;
}

.text-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5%;
}

hr {
    color: white;
    background-color: white;
}

.break {
    border-bottom: 1px solid white;
    width: 100%;
}

`;

export default function Footer() {
	return (
		<FooterContainer>
			<div className="innerDiv">
				<NavLink to="/feed">
					<img src={logo} alt="Logo. Two hands in the shape of a heart." />
				</NavLink>
				<div className="break"></div>
				<nav>
					<a href="index.html">Home</a>
					<a href="about.html">About</a>
					<a href="team.html">Team</a>
				</nav>
				<div className="break"></div>
				<div className="text-container">
					<p>Built by your Co-Makers at Lambda School © Co-Make 2020</p>
					<p>Build Week</p>
				</div>
			</div>
		</FooterContainer>
	);
}
