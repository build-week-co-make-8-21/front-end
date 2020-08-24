import React from "react";
import logo from "./Assets/co-make-logo-v2.png";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
	return (
		<Router>
			<div className="App">
				{/* <header className="App-header">
					<Link exact path="/" component={Signup}>
						<img src={logo} className="App-logo" alt="logo" />
					</Link>
					<p>Co-make is your local hub to resolve issues in your community.</p>
				</header> */}
			</div>
			<Route exact path="/" component={Signup} />
			<Route exact path="/login" component={Login} />
		</Router>
	);
}

export default App;
