import React from 'react'
import './App.css'
import Project from "../Projects/Project.js"
import Navbar from "../Navbar/Navbar.js"
import Footer from "../Footer/Footer.js"
import test from "../Projects/backgrounds/test.jpg"

function Header() {
  return (
    <article id="header" className="hero">
      <div className="text-center py-5">
        <h1 className="display-4">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <button type="button" className="btn btn-success btn-lg mt-5" onClick>Resume</button>
      </div>
    </article>
  )
}

function Portfolio() {
  return (
    <React.Fragment>
      <article id="portfolio">
        <div className="text-center py-5">
          <h1 className="display-4">Portfolio</h1>
          <p className="lead">This is an example of my set of skills. Where I utitlize different languages to accomplish clean layouts.</p>
        </div>
      </article>
      <div className="portfolio container-fluid p-5">
        <div className="row">
          {Project("Stuff", "thing", { test }, "https://www.google.com", "https://github.com/TJBrackett")}
          {Project("Thing", "thing", { test }, "https://www.google.com", "https://github.com/joemark1989/portfolio")}
        </div>
      </div>
    </React.Fragment>
  )
}

function TopFooter() {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <a href="http://localhost:3000/about" className="topFooter-about col-lg-6 col-sm-12">
              <h1 className="display-4 center">About Me</h1>
          </a>
          <a href="http://localhost:3000/contact" className="topFooter-contact col-lg-6 col-sm-12">
              <h1 className="display-4 center">Contact Me</h1>
          </a>
        </div>
      </div>
    </React.Fragment>
  )
}


function Render() {
  return (
    <React.Fragment>
      <Navbar />
      <Header />
      <Portfolio />
      <TopFooter />
      <Footer />
    </React.Fragment>
  )
}

export default Render;
