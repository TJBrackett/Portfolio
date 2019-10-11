import React from "react"
import "./Navbar.css"
import Resume from "../TJ_Resume.pdf"
import A from "react-anchor-link-smooth-scroll"

function Navbar() {
  return (
    <nav className="navbar sticky-top navbar-expand-md navbar-light">
      <button className="navbar-toggler ml-auto mt-3 mb-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav">
        </div>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <A className="link nav-link text-white font-weight-bold" data-target=".navbar-collapse.show" data-toggle="collapse"
                href="#Header" offset={window.innerWidth < 768 ? "335" : "80"}>
                <div className="navLink">
                  Home
                    </div>
              </A>
            </li>
            <li className="nav-item">
              <A className="link nav-link text-white font-weight-bold" data-target=".navbar-collapse.show" data-toggle="collapse"
                href="#About" offset={window.innerWidth < 768 ? "335" : "80"}>
                <div className="navLink">
                  About
                    </div>
              </A>
            </li>
            <li className="nav-item">
              <A className="link nav-link text-white font-weight-bold" data-target=".navbar-collapse.show" data-toggle="collapse"
                href="#Portfolio" offset={window.innerWidth < 768 ? "335" : "80"}>
                <div className="navLink">
                  Portfolio
                    </div>
              </A>
            </li>
            <li className="nav-item">
              <A className="link nav-link text-white font-weight-bold" data-target=".navbar-collapse.show" data-toggle="collapse"
                href="#Contact" offset={window.innerWidth < 768 ? "335" : "80"}>
                <div className="navLink">
                  Contact
                    </div>
              </A>
            </li>
            <li className="nav-item">
              <a className="link nav-link text-white font-weight-bold" data-target=".navbar-collapse.show" data-toggle="collapse"
                href={Resume} target="_blank" rel="noopener noreferrer">
                <div className="navLink">
                  Resume
                    </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar