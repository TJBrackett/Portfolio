import React from 'react';
import Navbar from "../Navbar/Navbar.js"
import Footer from "../Footer/Footer.js"

function About() {
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

function Render() {
  return (
    <React.Fragment>
      <Navbar />
      <About />
      <Footer/>
    </React.Fragment>
  )
}

export default Render