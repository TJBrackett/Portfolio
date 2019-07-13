import React from 'react';
import Navbar from "../Navbar/Navbar.js"
import Footer from "../Footer/Footer.js"
import "./About.css"
import rock from "../Images/rock.jpg"

function About() {
  return (
    <React.Fragment>
      <div className="container-fluid bg">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 p-0">
            <img className="img-fluid aboutImg" src={rock}/>
          </div>
          <div className="rightSide col-lg-6 col-md-6 col-sm-12 mt-5 text-center p-4">
            <h1 className="display-4 text-center">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
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