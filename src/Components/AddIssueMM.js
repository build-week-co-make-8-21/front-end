import React, { useState, useEffect } from "react";
import * as yup from 'yup';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { NavLink } from "react-router-dom";

const formScema = yup.object().shape({

    title: yup
        .string()
        .min(3, "Title must be atleast 3 character")
        .required("A title for your issue is required"),
    description: yup.string().required("Your Description is empty."),
    imageURL: yup.string().url("Must be a valid url"),
    categoryID: yup.string().required("Please select category."),

});

const initialDisabled = true;

function AddIssue() {

    const [formInfo, setFormInfo] = useState(inputValues);
    const [err, setErr] = useState(iFormErr);
    const [disabled, setDisabled] = useState(initialDisabled);
    //Added Histroy based off a requirement from Christians Addform 
    const history = useHistory();
   

  	useEffect(() => {
		formSchema.isValid(formInfo).then((valid) => {
			setDisabled(!valid);
		});
	}, [formInfo]);

	const validateChange = (event) => {
		yup
			.reach(formSchema, event.target.name)
			.validate(event.target.value)
			.then(() => {
				setErr({
					...err,
					[event.target.name]: "",
				});
			})
			.catch((error) => {
				setErr({
					...err,
					[event.target.name]: error.err,
				});
			});
	};
    
    

    const inputValues = {

        title: '',
        catagoryId: '',
		descripton: '',
		imageURL: '',
		username: username,
	};

    const iFormErr = {
        title: '',
        catagoryId: '',
		descripton: '',
		imageURL: '',
		username: username,
      

    };
    
    
        const [issues, setIssues, getIssues, username] = useState({
    
            title: '',
            catagoryId: '',
            descripton: '',
            imageURL: '',
            username: username,
    
        });
        const inputChange = (e) => {
            e.persist();
            validateChange(e);
            setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
        };
            const formSubmit = (event) => {
                event.preventDefault();
                axiosWithAuth()
                    .post("/api/issues", {
                        title: formInfo.title,
                        username: username,
                        description: formInfo.description,
                        imageURL: formInfo.imageURL,
                        categoryId: formInfo.categoryId,
                    })
                    .then((response) => {
                        console.log("username", username);
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
                        <div className="errors">
                            <div className="formErrors">{errors.title}</div>
                            <div className="formErrors">{errors.description}</div>
                            <div className="formErrors">{errors.imageURL}</div>
                            <div className="formErrors">{errors.categoryName}</div>
                        </div>

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
                       
                        <label htmlFor="description">Description Of Issue</label>
                        <textarea
                            id="description"
                            placeholder="Enter Descripton of Issue"
                            name="description"
                            value={formInfo.description}
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

                        {/* The Form Below was created by Christian Bautista */}

                        <label htmlFor="category">
                            <select onChange={inputChange} value={formValues.categoryId} name="categoryId">
                                <option value="" default disabled>
                                    Category
						</option>
                                <option value={1}>Yard and Lawn</option>
                                <option value={2}>Community Activities</option>
                                <option value={3}>Crime & Safety</option>
                                <option value={4}>Lost & Found</option>
                                <option value={5}>Recommendation</option>
                                <option value={6}>Flooding</option>
                                <option value={7}>General</option>
                                <option value={8}>Announcements</option>
                                <option value={9}>Pets</option>
                                <option value={10}>Road Closure & Transportation</option>
                                <option value={11}>School & Education</option>
                                <option value={12}>Holiday</option>
                                <option value={13}>Utilities</option>
                            </select>
                        </label>
                        <button type="submit" disabled={disabled} to='/feed'> Add Issue </button>
                    </form>
                    <NavLink to='/feed'>
                        <button>Cancel</button>
                    </NavLink>
                </div>
             
        );
      
  
        
    };

    export default AddIssue;