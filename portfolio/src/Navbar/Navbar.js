import React from "react"
import logo from "../Images/initial.png"
import "./Navbar.css"
import Resume from "../TJ_Resume.pdf"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <React.Fragment>
      <nav className="nav-bg navbar sticky-top navbar-expand-lg navbar-light">
        <a href="http://www.tjbrackett.com"><img className="pic" src={logo} alt="logo" /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
          </div>
          <div className="form-inline my-5 my-lg-0 mr-4 p-0">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="link nav-link text-white font-weight-bold" href="http://www.tjbrackett.com">
                  <div className="navLink">
                    Home
                    </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="link nav-link text-white font-weight-bold" href={Resume} target="_blank" rel="noopener noreferrer">
                  <div className="navLink">
                    Resume
                    </div>
                </a>
              </li>
              <li className="nav-item">
                
                <Link className="link nav-link text-white font-weight-bold" to="/about">
                  <div className="navLink">
                    About
                    </div>
                </Link>
              </li>
              <li className="nav-item">
                <a className="link nav-link text-white font-weight-bold" href="http://www.tjbrackett.com/contact">
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