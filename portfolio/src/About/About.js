import React from 'react';
import Navbar from "../Navbar/Navbar.js"
import Footer from "../Footer/Footer.js"
import "./About.css"

function About() {
  return (
    <React.Fragment>
      <div className="container-fluid bg">
        <div className="row">
          <div className="rightSide p-5 text-center ">
            <h1 className="display-4 text-center aboutHeader">TJ Brackett</h1>
            <p className="lead aboutP">I am a software engineer who specializes in building applications specific to the business needs of my clients.  I have done work in software development, database design and implementation, native applications, full stack web development, and server management.</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

function Render() {
  return (
    <React.Fragment>
      <Navbar />
      <About />
      <Footer />
    </React.Fragment>
  )
}

export default Render