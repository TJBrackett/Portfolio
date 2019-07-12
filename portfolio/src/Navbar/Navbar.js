import React from "react"
import logo from "../Images/initial.png"
import "./Navbar.css"
import Resume from "../TJ_Resume.pdf"

function Navbar() {
    return (
      <React.Fragment>
        <nav className="nav-bg navbar sticky-top navbar-expand-lg navbar-light">
          <a href="http://localhost:3000"><img className="pic" src={logo} alt="logo" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav mr-auto">
            </div>
            <div className="form-inline my-5 my-lg-0">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item ml-3 mr-2">
                  <a className="nav-link text-white font-weight-bold" href="http://localhost:3000">Home</a>
                </li>
                <li className="nav-item ml-3 mr-2">
                  <a className="nav-link text-white font-weight-bold" href={Resume} target="_blank">Resume</a>
                </li>
                <li className="nav-item ml-3 mr-2">
                  <a className="nav-link text-white font-weight-bold" href="http://localhost:3000/about">About</a>
                </li>
                <li className="nav-item ml-3 mr-2">
                  <a className="nav-link text-white font-weight-bold" href="http://localhost:3000/contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  }

  export default Navbar