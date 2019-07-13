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
          <div className="navbar collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav mr-auto">
            </div>
            <div className="form-inline my-5 my-lg-0 mr-4">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="link nav-link text-white font-weight-bold" href="http://localhost:3000">
                    <div className="navLink">
                      Home
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="link nav-link text-white font-weight-bold" href={Resume} target="_blank">
                    <div className="navLink">
                      Resume
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="link nav-link text-white font-weight-bold" href="http://localhost:3000/about">
                    <div className="navLink">
                      About
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="link nav-link text-white font-weight-bold" href="http://localhost:3000/contact">
                    <div className="navLink">
                      Contact
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  }

  export default Navbar