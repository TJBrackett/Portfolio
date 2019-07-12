import React from 'react'
import './App.css'
import logo from "../Images/initial.png"
import logo2 from "../Images/logo.svg"
import Project from "../Projects/Project.js"
import Navbar from "../Navbar/Navbar.js"

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
      <article className="portfolio">
        <h3>Thumbnail Images</h3>
        <div className="list-inline gallery">
          {Project("Stuff", "thing", { logo }, "https://www.google.com", "https://github.com/TJBrackett")}
          {Project("Thing", "thing", { logo2 }, "https://www.google.com", "https://github.com/joemark1989/portfolio")}
        </div>
      </article>
    </React.Fragment>
  )
}

function TopFooter() {
  return (
    <div>

    </div>
  )
}

function Footer() {
  return (
    <div>
      
    </div>
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
