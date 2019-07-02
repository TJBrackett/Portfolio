import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import './App.css'
import logo from "./initial.jpg"
import Card from './Card.js'


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
                <a class="nav-link" href="#header">Home</a>
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div id="about" class="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h1>About Front</h1>
                </div>
                <div className="flip-card-back">
                  <h1>About Back</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div id="contact" class="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h1>Contact Front</h1>
                </div>
                <div className="flip-card-back" >
                  <form>
                    <div class="form-row">
                      <div class="form-group col-lg-12 col-md-6">
                        <label for="FName">First Name</label>
                        <input class="form-control form-control-sm" id="FName" placeholder="First Name" />
                      </div>
                      <div class="form-group col-lg-12 col-md-6">
                        <label for="LName">Last Name</label>
                        <input class="form-control form-control-sm" id="LName" placeholder="Last Name" />
                      </div>
                      <div class="form-group col-lg-12 col-md-6 col-sm-5">
                        <label for="MI">MI</label>
                        <input class="form-control form-control-sm" id="MI" placeholder="MI" />
                      </div>
                      <div class="form-group col form-group col-lg-12 col-md-6 col-sm-6">
                        <label for="DOB">Birthday</label>
                        <input class="form-control form-control-sm" id="DOB" type="date" placeholder="12345" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}


function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Header />
      <Portfolio />
      <About />
    </React.Fragment>
  )
}

export default App;
