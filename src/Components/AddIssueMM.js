import React, { useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { NavLink } from "react-router-dom";



function AddIssue() {
    const [formInfo, setFormInfo] = useState(inputValues);
    const [err, setErr] = useState(iFormErr);

    const { issues, setIssues, username, getIssues } = useState()

    const inputValues = {

        title: "",
		body: "",
		imageURL: "",
		username: username,
	};

    const iFormErr = {
      title: "",
      body: "",
      imageURL: "",
      username: username,

    };
    

    const inputChange = (e) => {
        e.persist();
        validateChange(e);
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });

        const formSubmit = (event) => {
            event.preventDefault();
            axiosWithAuth()
                .post("/api/issues", {
                    title: formInfo.title,
                    username: username,
                    body: formInfo.body,
                    imageURL: formInfo.imageURL,
                })
                .then((response) => {
                    console.log("formInfo", formInfo);
                    console.log("response", response);
                    console.log("issues", issues);
                    setIssues([response.data, ...issues]);
                    setformInfo(inputValues);
                    console.log(response.data);
                    getIssues();
                    history.push("/feed");
                })
                .catch((error) => {
                    console.log(error.response.data);
                    alert(`there was an error. ${error.response.data.message}`);
                });
        };




        return (
            <div>
                <form onSubmit={formSubmit}>
                    <h1>Add New Issue</h1>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        value={formInfo.title}
                        onChange={inputChange}
                    />

                    <label htmlFor="body">Description Of Issue</label>
                    <textarea
                        id="body"
                        placeholder="Enter Descripton of Issue"
                        name="body"
                        value={formInfo.body}
                        onChange={inputChange}
                    />
                  
                    <label htmlFor="image">Input Image URL</label>
                    <textarea
                        id="image"
                        placeholder="input Image URL"
                        name="image"
                        value={formInfo.image}
                        onChange={inputChange}
                    />
                
                    <button type="submit"> Add Issue </button>
                </form>
                <NavLink to='/feed'>
                    <button>Cancel</button>
                </NavLink>
            </div>
        );
    }

    export default AddIssue;