import React, { useState, useEffect } from "react";
import "./Blog.css";
import '../index.css'
import Konami from "react-konami-code";
import ImageUploader from "react-images-upload";
import Footer from "../Footer/Footer.js";
import BlogPosts from './BlogPosts/BlogPosts.js'
import BlogNav from './BlogNav/BlogNav.js'

function Blog() {
  //Need to create card layout and receive cards
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPost] = useState([{
    id: '',
    title: '',
    body: ''
  }])
  const [search, setSearch] = useState('')
  
  useEffect( () => {
    GetPosts();
  });
const userSearch = (data) => {
  setSearch(data)
}
const GetPosts = () => {
    const getPostUrl = "http://jsonplaceholder.typicode.com/posts";
    fetch(getPostUrl)
      .then(res => res.json())
      .then(json => {
        setPost(json)
      })
  }
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
    event.preventDefault()
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
          ShowPosts();
        } else {
          ShowPosts();
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="blogBackground" id="Blog"></div>
      <div className="postContainer row" id="Posts">
        <div className="col-lg-2 col-md-2 col-sm-0 sideSection"></div>
        <div className="col-lg-8 col-md-8 col-sm-12 middleSection">
        <BlogNav 
          sendData={userSearch}
        />
        <div className="blogHeaderBg">
        <div className="blogHeader text-center py-3 p-2">
        <h1 className="display-4"  id="BlogHome">My Blog</h1>
        </div>
        </div>
          {posts.map(post => (
            <BlogPosts
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
          <div className="blogFooter">
          <Footer />
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-0 sideSection"></div>
      </div>
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
    </React.Fragment>
  );
}
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
    ShowSecret();
  } else {
    ShowPosts();
  }
}

function ShowSecret() {
  document.getElementById("Blog").style.visibility = "hidden";
  document.getElementById("Posts").style.visibility = "hidden";
  document.getElementById("Create").style.visibility = "visible";
  document.getElementById("Create").style.zIndex = 0;
}
function ShowPosts() {
  document.getElementById("Blog").style.visibility = "visible";
  document.getElementById("Posts").style.visibility = "visible";
  document.getElementById("Create").style.visibility = "hidden";
  document.getElementById("Create").style.zIndex = -1;
}
function Render() {
  const secretCode = [17, 57, 53, 50, 49];

  return (
    <React.Fragment>
      <Blog />
      <Konami
        code={secretCode}
        action={LoginInfo}
        resetDelay={3000}
        timeout={5000}
      ></Konami>
    </React.Fragment>
  );
}

export default Render;
