import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import "./AdminTools.css";

export default function AdminTools() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
      
  })
  const imgDrop = img => {
    setImage(img);
  };
  const changeTitle = event => {
    setTitle(event.target.value);
  };
  const changeBody = event => {
    setBody(event.target.value);
  };

  const submitPost = event => {
    // Need to send JWT on submit
    const blogPostUrl = "http://jsonplaceholder.typicode.com/posts";
    event.preventDefault();
    fetch(blogPostUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      post: JSON.stringify({
        image: image,
        title: title,
        body: body
      })
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
        } else {
        }
      })
      .catch(err => console.log(err));
  };
  function LoginInfo() {
    //Need to receive JWT on login
    const username = prompt("Username");

    if (username !== "" || username !== null) {
      const password = prompt("Password");

      if (password !== "" || password !== null) {
        BlogLogin(username, password);
      }
    }
  }
  function BlogLogin(username, password) {
    if (username === "tjb" && password === "123") {
    } else {
    }
  }

  return (
    <div>
      <form className="postForm" onSubmit={submitPost}>
        <div className="form-row" id="Create">
          <div className="postForm form-group col-6 m-0 p-0">
            <ImageUploader
              withIcon={true}
              buttonText="Header Image"
              withPreview={true}
              onChange={imgDrop}
              imgExtension={[".jpg", ".gif", ".png"]}
              maxFileSize={5242880}
            />
          </div>
          <div className="row p-2 m-2">
            <input
              type="text"
              className="createTitle form-control-lg"
              placeholder="title"
              onChange={changeTitle}
            ></input>
            <textarea
              rows="10"
              className="createPost form-control-lg"
              placeholder="body"
              onChange={changeBody}
            ></textarea>
          </div>
          <button type="submit" className="submitPost col-12">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
