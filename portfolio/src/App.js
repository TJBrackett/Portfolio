import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import './App.css'
import logo from "./initial.jpg"
import Project from "./Projects/Project.js"
import logo2 from "./logo.svg"



function Navbar() {
  return (
    <React.Fragment>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <img src={logo} alt="initals" />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
          </div>
          <div className="form-inline my-5 my-lg-0">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ml-3 mr-2">
                <a className="nav-link" href="#header">Home</a>
              </li>
              <li className="nav-item ml-3 mr-2">
                <a className="nav-link" href="#portfolio">Portfolio</a>
              </li>
              <li className="nav-item ml-3 mr-2">
                <a className="nav-link" href="http://localhost:3000/about">About</a>
              </li>
              <li className="nav-item ml-3 mr-2">
                <a className="nav-link" href="http://localhost:3000/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

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
          {Project("Stuff", "thing", {logo},"https://www.google.com", "https://github.com/TJBrackett")}
          {Project("Thing", "thing", {logo2}, "https://www.google.com", "https://github.com/joemark1989/portfolio")}
        </div>
      </article>
    </React.Fragment>
  )
}

function topFooter(){
return(
  <div>

  </div>
)
}

function Footer() {
  return(
    <div>
      
    </div>
  )
}

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Header />
      <Portfolio />
      <topFooter/>
      <Footer />
    </React.Fragment>
  )
}

export default App;
