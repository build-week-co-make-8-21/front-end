import React, { useState } from "react";
import Styled from "styled-components";
import { NavLink } from "react-router-dom";

const MenuContainer = Styled.div`
    display: none;

    @media (max-width: 450px) {
		display: flex;
    }


#menu-button {
    z-index: 100;
    position: absolute;
    right: 5%;
    top: 10px;
    border: unset;
    background-color: unset;
}

#menu-button i {
    font-size: 2.6rem;
    color: #3184ed;
}

#x {
    z-index: 100;
    position: fixed;
    top: 8px;
    right: 7%;
    color: #FFFFFF;
    font-size: 5.5rem;
}

#x i {
    font-size: 3rem;
    color: white;
}

#menu-overlay {
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background: linear-gradient(to bottom, #56ccf2, #2f80ed);
    }
#menu-overlay div a {
    font-size: 2rem;
    line-height: 4rem;
    color: #FFFFFF;
}

.hide {
    display: none;
}

.show {
    display: flex;
}
`;

export default function BurgerMenu() {
	const [isClicked, setIsClicked] = useState(false);

	const menuToggle = (event) => {
		event.preventDefault();
		if (isClicked === true) {
			setIsClicked(false);
		} else {
			setIsClicked(true);
		}
	};

	return (
		<MenuContainer>
			<button
				type="button"
				id="menu-button"
				className={isClicked ? "hide" : "show"}
				onClick={menuToggle}
			>
				<i className="fas fa-bars"></i>
			</button>
			<div role="button" id="x" className={isClicked ? "show" : "hide"} onClick={menuToggle}>
				<i className="fas fa-times"></i>
			</div>
			<nav role="navigation" id="menu-overlay" className={isClicked ? "show" : "hide"}>
				<div role="button" onClick={menuToggle}>
					<NavLink to="/feed">Home</NavLink>
				</div>
				<div role="button">
					<a href="https://jovial-austin-69da22.netlify.app/about.html">About</a>
				</div>
				<div role="button">
					<a href="https://jovial-austin-69da22.netlify.app/team.html">Team</a>
				</div>
			</nav>
		</MenuContainer>
	);
}
