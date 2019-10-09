import React from "react"
import "./Navbar.css"
import Resume from "../TJ_Resume.pdf"
import A from "react-anchor-link-smooth-scroll"
import { Link } from 'react-router-dom'
import Logo from "../Images/initial.png"

function Navbar() {
  return (
    <React.Fragment>
      <nav className="nav-bg navbar sticky-top navbar-expand-md navbar-light">
        <A href="#Header"><img className="pic" src={Logo} alt="logo" /></A>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
          </div>
          <div className="form-inline my-lg-0 mr-0 p-0">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <A className="link nav-link text-white font-weight-bold" href="#Header">
                  <div className="navLink">
                  <i className="fa fa-lg fa-home fa-3x" /><br></br>
                    Home
                    </div>
                </A>
              </li>
              <li className="nav-item">
                <A className="link nav-link text-white font-weight-bold" href="#About" offset="120">
                  <div className="navLink">
                  <i className="fa fa-lg fa-user fa-3x" /><br></br>
                    About
                    </div>
                </A>
              </li>
              <li className="nav-item">
                <A className="link nav-link text-white font-weight-bold" href="#Portfolio" offset="120">
                  <div className="navLink">
                  <i className="fa fa-lg fa-folder-open fa-3x" /><br></br>
                    Portfolio
                    </div>
                </A>
              </li>
              <li className="nav-item">
                <A className="link nav-link text-white font-weight-bold" href="#Contact" offset="120">
                  <div className="navLink">
                  <i className="fa fa-lg fa-comments fa-3x" /><br></br>
                    Contact
                    </div>
                </A>
              </li>
              <li className="nav-item">
                <Link className="link nav-link text-white font-weight-bold" to={Resume} target="_blank" rel="noopener noreferrer">
                  <div className="navLink">
                  <i className="fa fa-lg fa-file-text fa-3x" /><br></br>
                    Resume
                    </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default Navbar