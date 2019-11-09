import React from "react";
import "./Blog.css";
import Konami from "react-konami-code";

function Blog() {
  let test = "";
  for (let i = 0; i < 1000; i++) {
    test += " blog test";
  }

  return (
    <React.Fragment>
      <div className="blogBackground" id="Blog"></div>
      <div className="postContainer row" id="Posts">
        <div className="col-lg-2 col-md-2 col-sm-0"></div>
        <div className="col-lg-8 col-md-8 col-sm-12 middleSection">
          <p className="testP">{test}</p>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-0"></div>
      </div>
      <div id="Create">
        <div className="postForm">
          <input type="text" className="createTitle"></input>
          <textarea rows="4" className="createPost"></textarea>
        </div>
      </div>
    </React.Fragment>
  );
}
function LoginInfo() {
  const username = prompt("Username");

  if (username !== "" || username !== null) {
    const password = prompt("Password");

    if (password !== "" || password !== null) {
      BlogLogin(username, password);
    }
  }
}
function BlogLogin(username, password) {
  console.log(`username: ${username}, password: ${password}`);
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
  const secretCode = process.env.REACT_APP_LOGIN_CODE.split(" ");

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
