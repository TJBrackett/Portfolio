import React from 'react'
import './App.css'
import Project from "../Projects/Project.js"
import Navbar from "../Navbar/Navbar.js"
import Footer from "../Footer/Footer.js"
import { Sticky, FinalProj, StreetSmarts } from "../Projects/ProjInfo.js"
import { Link } from "react-router-dom";
import { ProjPics } from "../Projects/ProjInfo.js"
import A from "react-anchor-link-smooth-scroll"

function Header() {
  return (
    <div className="headerBackground">
      <div className="text-center text-white caption">
        <h1 className="display-2" id="Home">TJB</h1>
        <p className="lead">Welcome to my responsive portfolio web application.</p>
        <A type="input" class="btn btn-outline-light btn-lg" href="#Portfolio" offset="108">Projects</A>
      </div>
    </div>
  )
}

function Portfolio() {
  return (
    <React.Fragment>
      <div className="portfolioHeader" id="Portfolio">
        <div className="text-center py-5 p-2">
          <h1 className="display-4">Portfolio</h1>
          <p className="lead">This is an example of my set of skills. Where I utitlize different languages to accomplish clean layouts.</p>
        </div>
      </div>
      <div className="portfolio p-5 d-flex justify-content-center flex-wrap">
        {Project(Sticky.title, Sticky.desc, ProjPics.Sticky, Sticky.pageLink, Sticky.githubLink)}
        {Project(FinalProj.title, FinalProj.desc, ProjPics.Final, FinalProj.pageLink, FinalProj.githubLink)}
        {Project(StreetSmarts.title, StreetSmarts.desc, ProjPics.Sticky, StreetSmarts.pageLink, StreetSmarts.githubLink)}
      </div>
    </React.Fragment>
  )
}

function TopFooter() {
  return (
    <React.Fragment>
      <div className="top-footer container-fluid">
        <div className="row">
          <Link to="/about" className="topFooter-about col-lg-6 col-sm-12">
            <h1 className="display-4 center">About Me</h1>
            <div className="overlay-about">
            <h1 className="display-4 center text-slide">About Me</h1>
          </div>
          </Link>
          <Link to="/contact" className="topFooter-contact col-lg-6 col-sm-12">
            <h1 className="display-4 center">Contact Me</h1>
            <div className="overlay-contact">
            <h1 className="display-4 center text-slide">Contact Me</h1>
          </div>
          </Link>
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
