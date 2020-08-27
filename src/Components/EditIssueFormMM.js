import React, { useState } from "react";

const EditForm = (props) => {
  const [edit, setEdit] = useState({
    title: '',
      body: '',
    image: ''
  });

  const handleChanges = (e) => {
    console.log("What is target.value", e);
    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addNewEdit(edit);
    setEdit({
      title: '',
      body: '',
      image: ''
    });
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Enter title"
        name="title"
        value={edit.title}
        onChange={handleChanges}
      />

      <label htmlFor="body">Description Of Issue</label>
      <textarea
        id="body"
        placeholder="Enter Descripton of Issue"
        name="body"
        value={edit.body}
        onChange={handleChanges}
          />
          
      <label htmlFor="image">Input Image URL</label>
      <textarea
        id="image"
        placeholder="input Image URL"
        name="image"
        value={edit.image}
        onChange={handleChanges}
      />


      <button type="submit"> Edit Issue </button>
    </form>
  );
};

export default EditForm;

