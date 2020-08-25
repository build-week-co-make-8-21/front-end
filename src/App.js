import React, { useEffect, useState } from "react";
import logo from "./Assets/co-make-logo-v2.png";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Feed from "./Components/Feed";

import { axiosWithAuth } from "./utils/axiosWithAuth";
import PrivateRoute from "./Components/PrivateRoute";
import { FeedContext } from "./contexts/context";

function App() {
	const [issues, addIssues] = useState([]);
	const [username, setUsername] = useState("");

	useEffect(() => {
		axiosWithAuth()
			.get("/api/issues")
			.then((res) => {
				console.log(res);
				addIssues(res.data);
			});
	}, []);
	return (
		<Router>
			<FeedContext.Provider value={{ issues, addIssues, setUsername }}>
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
				<PrivateRoute exact path="/feed" component={Feed} />
			</FeedContext.Provider>
		</Router>
	);
}
export default App;
