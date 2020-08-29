import React, { useState } from "react";
import Styled from "styled-components";

const MenuContainer = Styled.div`
    display: none;

    @media (max-width: 450px) {
		display: flex;
    }
    
#menu-button {
    display: flex;
    z-index: 100;
    right: 10%;
    position: absolute;
    top: 20px;
    color: #000000A6;
    font-size: 5rem;
    border: unset;
    background-color: unset;
    width: 20px;
    height: 20px;
}

#x {
    display: flex;
    z-index: 100;
    position: fixed;
    top: 17px;
    right: 4.5%;
    color: #FFFFFF;
    font-size: 5.5rem;
}

#menu-overlay {
    display: none;
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-image: linear-gradient(180deg, #6A11CB 15.25%, #2575FC 100%);
    }
#menu-overlay div a {
    font-size: 5rem;
    line-height: 10rem;
    color: #FFFFFF;
}
`;

export default function BurgerMenu() {
	const [isClicked, setIsClicked] = useState(false);

	const menuToggle = (event) => {
		event.preventDefault();
		// if (isClicked === true) {
		// 	menuOverlay.style.display = "none";
		// 	menuButton.style.display = "flex";
		// 	x.style.display = "none";
		// 	setIsClicked(false);
		// } else {
		// 	menuOverlay.style.display = "flex";
		// 	menuButton.style.display = "none";
		// 	x.style.display = "flex";
		// 	setIsClicked(true);
		// }
	};

	return (
		<MenuContainer>
			<button type="button" id="menu-button" className="toggle-menu" onClick={menuToggle}>
				<i className="fas fa-bars"></i>
			</button>
			<div role="button" id="x" class="toggle-menu">
				<i className="fas fa-times"></i>
			</div>
			<nav role="navigation" id="menu-overlay">
				<div role="button">
					<a href="index.html">Home</a>
				</div>
				<div role="button">
					<a href="about.html">About</a>
				</div>
				<div role="button">
					<a href="team.html">Team</a>
				</div>
			</nav>
		</MenuContainer>
	);
}
