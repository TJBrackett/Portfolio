import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import './App.css'
import logo from "./initial.JPG"



function Navbar() {
  return (
    <React.Fragment>
      <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <img src={logo} alt="initals" />
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="navbar-nav mr-auto">
          </div>
          <div class="form-inline my-5 my-lg-0">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item ml-3 mr-2">
                <a class="nav-link " href="#header">Home</a>
              </li>
              <li class="nav-item ml-3 mr-2">
                <a class="nav-link " href="#portfolio">Portfolio</a>
              </li>
              <li class="nav-item ml-3 mr-2">
                <a class="nav-link " href="#about">About</a>
              </li>
              <li class="nav-item ml-3 mr-2">
                <a class="nav-link " href="#contact">Contact</a>
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
        <button type="button" className="btn btn-success btn-lg mt-5" onClick>Portfolio</button>
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
        <div class="list-inline gallery">
          <img class="thumbnail zoom" src="https://placeimg.com/110/110/abstract/1" alt="man" />
          <img class="thumbnail zoom" src="https://placeimg.com/110/110/abstract/2" alt="girls" />
          <img class="thumbnail zoom" src="https://placeimg.com/110/110/abstract/3" alt="girl" />
          <img class="thumbnail zoom" src="https://placeimg.com/110/110/abstract/4" alt="girls" />
        </div>
      </article>
    </React.Fragment>
  )
}

function About() {
  return (
    <React.Fragment>
      <div id="about" class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <h1>About Front</h1>
          </div>
          <div class="flip-card-back">
            <h1>About Back</h1>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

function Contact() {
  return (
    <div id="contact" class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <h1>Contact Front</h1>
        </div>
        <div class="flip-card-back">
          <h1>Contact Back</h1>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Header />
      <Portfolio />
      <About />
      <Contact />
    </React.Fragment>
  )
}

export default App;
