import React from "react";
import "./Blog.css";
import Konami from 'react-konami-code'

function Blog() {
  let test = "";
  for (let i = 0; i < 1000; i++) {
    test += " blog test";
  }
  return (
    <React.Fragment>
      <div className="blogBackground" id="Blog"></div>
      <div className="postContainer row">
        <div className="col-lg-2 col-md-2 col-sm-0"></div>
        <div className="col-lg-8 col-md-8 col-sm-12 middleSection">
          <p className="testP">{test}</p>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-0"></div>
      </div>
    </React.Fragment>
  );
}
function LoginInfo() {
  const username = prompt("Username")

  if (username !== "" || username !== null) {
    const password = prompt("Password")

    if (password !== "" || password !== null) {
      BlogLogin(username, password)
    }
  }
}
function BlogLogin(username, password) {

} 
function Render() {
  let loginCode = []
  const secretCode = process.env.REACT_APP_LOGIN_CODE
  for (let i = 0; i < process.env.REACT_APP_LOGIN_CODE.length; i++) {
    loginCode.push(secretCode[i])
  }
  console.log(secretCode[0])
  return(
    <React.Fragment>
      <Blog />
      <Konami
        code={[17, 57, 53, 50, 49]}
        action={LoginInfo}
        resetDelay={3000}
        timeout={5000}
      >
    </Konami>
    </React.Fragment>
  )
}

export default Render;