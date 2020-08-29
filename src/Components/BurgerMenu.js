import React, { useState } from "react";
import Styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";

const MenuContainer = Styled.div`
    display: none;
    text-align: center;

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
    text-align: center;
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

#menu-overlay div {
    margin: 0 auto;
}

.hide {
    display: none;
}

.show {
    display: flex;
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
    margin: 0;
    padding: 0;
}

.logout:hover {
	border: .5px solid #3184ed;
    background-color: white;
    color: #3184ed;
    cursor: pointer;
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

	const history = useHistory();
	const logout = () => {
		localStorage.clear("token");
		history.push("/");
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
				<div className={isClicked ? "hide logout" : "show logout"} onClick={menuToggle}>
					<span type="button" onClick={logout}>
						Logout
					</span>
				</div>
			</nav>
		</MenuContainer>
	);
}
