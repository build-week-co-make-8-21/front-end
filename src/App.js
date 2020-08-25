import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Feed from "./Components/Feed";
import AddIssuesForm from "./Components/AddIssueForm";
import IssuePage from "./Components/IssuePage";

import { axiosWithAuth } from "./utils/axiosWithAuth";
import PrivateRoute from "./Components/PrivateRoute";
import { FeedContext } from "./contexts/context";

export default function App() {
	const [issues, addIssues] = useState([]);
	const [username, setUsername] = useState("");

	useEffect(() => {
		axiosWithAuth()
			.get("/api/issues")
			.then((response) => {
				console.log(response);
				addIssues(response.data);
			});
	}, [setUsername]);
	return (
		<Router>
			<FeedContext.Provider value={{ issues, addIssues, username, setUsername }}>
				<Route exact path="/" component={Signup} />
				<Route exact path="/login" component={Login} />
				<PrivateRoute exact path="/feed" component={Feed} />
				<PrivateRoute exact path="/create" component={AddIssuesForm} />
				{issues &&
					issues.map((issue) => {
						return (
							<PrivateRoute
								exact
								style={{ textDecoration: "none" }}
								path={`/issues/${issue.issueId}`}
							>
								<IssuePage issue={issue} />
							</PrivateRoute>
						);
					})}
				{/* <PrivateRoute path="/issues/:id" component={IssuePage} /> */}
			</FeedContext.Provider>
		</Router>
	);
}
