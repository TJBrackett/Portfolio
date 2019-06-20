import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import './App.css'




function Navbar() {
  return (
    <React.Fragment>
      <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="navbar-nav mr-auto">
          </div>
          <div class="form-inline my-5 my-lg-0">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item ml-3 mr-2">
                <a class="nav-link" href="#header">Home</a>
              </li>
              <li class="nav-item ml-3 mr-2">
                <a class="nav-link" href="#portfolio">Portfolio</a>
              </li>
              <li class="nav-item ml-3 mr-2">
                <a class="nav-link" href="#about">About</a>
              </li>
              <li class="nav-item ml-3 mr-2">
                <a class="nav-link" href="#contact">Contact</a>
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
        <div className="text-center py-5">
          <h1 className="display-4">Portfolio</h1>
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        </div>
      </article>
    </React.Fragment>
  )
}

function About() {
  return (
    <article id="about" className="about">
      <div className="text-center py-5">
        <h1 className="display-4">About</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      </div>
    </article>
  )
}

function Contact() {
  return (
    <article id="contact" className="footer">
      <div className="text-center py-5">
        <h1 className="display-4">Contact</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      </div>
    </article>
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
