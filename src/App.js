import React from "react";
import logo from "./Assets/co-make-logo-v2.png";
import "./App.css";
import Signup from "./Components/Signup";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Co-make is your local hub to resolve issues in your community.</p>
			</header>
		</div>
	);
}

export default App;
