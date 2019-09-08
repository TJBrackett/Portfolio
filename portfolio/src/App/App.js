import React from 'react'
import './App.css'
import Project from "../Projects/Project.js"
import Navbar from "../Navbar/Navbar.js"
import Footer from "../Footer/Footer.js"
import { Sticky, FinalProj, StreetSmarts, MyPage, Hackermap } from "../Projects/ProjInfo.js"
import { Link } from "react-router-dom";
import { ProjPics } from "../Projects/ProjInfo.js"
import A from "react-anchor-link-smooth-scroll"

function Header() {
  return (
    <div className="headerBackground">
      <div className="text-center text-white caption">
        <h1 className="display-2" id="Home">TJB</h1>
        <p className="lead">Welcome to my responsive portfolio website.</p>
        <A type="input" className="btn btn-outline-light btn-lg headerBtn" href="#Portfolio" offset="106">Projects</A>
      </div>
    </div>
  )
}

function Portfolio() {
  return (
    <React.Fragment>
      <div className="portfolioHeader" id="Portfolio">
        <div className="text-center py-5 p-2">
          <h1 className="display-4">Projects</h1>
          <p className="lead">A timeline of my progess in software development ranging from previous schoolwork to my current personal projects.</p>
        </div>
      </div>
      <div className="portfolio p-5 d-flex justify-content-center flex-wrap">
        {/* {Project(Sticky.title, Sticky.desc, ProjPics.Sticky, Sticky.pageLink, Sticky.githubLink, Sticky.date)} */}
        {Project(FinalProj.title, FinalProj.desc, ProjPics.Final, FinalProj.pageLink, FinalProj.githubLink, FinalProj.date)}
        {/* {Project(StreetSmarts.title, StreetSmarts.desc, ProjPics.StreetSmarts, StreetSmarts.pageLink, StreetSmarts.githubLink, StreetSmarts.date)} */}
        {Project(MyPage.title, MyPage.desc, ProjPics.Portfolio, MyPage.pageLink, MyPage.githubLink, MyPage.date)}
        {Project(Hackermap.title, Hackermap.desc, ProjPics.Hackermap, Hackermap.pageLink, Hackermap.githubLink, Hackermap.date)}
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
            <h1 className="display-4 center topFooter-text">About Me</h1>
            <div className="overlay-about">
          </div>
          </Link>
          <Link to="/contact" className="topFooter-contact col-lg-6 col-sm-12">
            <h1 className="display-4 center topFooter-text">Contact Me</h1>
            <div className="overlay-contact">
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
