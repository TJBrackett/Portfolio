import React from "react";
import "./App.css";
import Project from "../Projects/Project.js";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import { Sticky, FinalProj, Hackermap } from "../Projects/ProjInfo.js";
import { ProjPics } from "../Projects/ProjInfo.js";
import A from "react-anchor-link-smooth-scroll";
import About from "../About/About";
import Contact from "../Contact/Contact";

function Header() {
  return (
    <React.Fragment>
      <div className="headerWrapper">
        <div className="headerBackground" id="Header"></div>
      </div>
      <div className="text-center text-white caption">
        <h1 className="display-2" id="Home">
          TJB
        </h1>
        <p className="lead">Full Stack Web Developer</p>
        <A
          type="input"
          className="btn btn-outline-light btn-lg headerBtn"
          href="#About"
          offset="80"
        >
          Explore
        </A>
      </div>
    </React.Fragment>
  );
}

function Portfolio() {
  return (
    <React.Fragment>
      <hr />
      <div className="portfolioHeader text-center py-3 p-2" id="Portfolio">
          <h1 className="display-4" data-aos="zoom-in" data-aos-duration="1750">Projects</h1>
          <p className="lead"  data-aos="zoom-in" data-aos-duration="1750">
            A timeline of my progess in software development ranging from
            previous schoolwork to my current personal projects.
          </p>
      </div>
      <hr />
      <div className="portfolio p-5 d-flex justify-content-center flex-wrap">
        {Project(
          Sticky.title,
          Sticky.desc,
          ProjPics.Sticky,
          Sticky.pageLink,
          Sticky.githubLink,
          Sticky.date
        )}
        {Project(
          FinalProj.title,
          FinalProj.desc,
          ProjPics.Final,
          FinalProj.pageLink,
          FinalProj.githubLink,
          FinalProj.date
        )}
        {Project(
          Hackermap.title,
          Hackermap.desc,
          ProjPics.Hackermap,
          Hackermap.pageLink,
          Hackermap.githubLink,
          Hackermap.date
        )}
      </div>
    </React.Fragment>
  );
}

function Render() {
  if (window.innerWidth < 768) {
    return (
      <React.Fragment>
        <Navbar />
        <Header />
        <About />
        <Portfolio />
        <Contact />
        <Footer />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Header />
        <Navbar />
        <About />
        <Portfolio />
        <Contact />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Render;
