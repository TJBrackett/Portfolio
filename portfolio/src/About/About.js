import React from "react";
import Angular from "../Images/angular.png";
import Apache from "../Images/apache.png";
import Cpp from "../Images/cpp.png";
import Css from "../Images/css.png";
import Firebase from "../Images/firebase.png";
import Git from "../Images/git.png";
import Html from "../Images/html.png";
import Java from "../Images/java.png";
import Js from "../Images/js.png";
import Linux from "../Images/linux.png";
import Node from "../Images/node.png";
import Python from "../Images/python.png";
import ReactIcon from "../Images/react.png";
import Mysql from "../Images/mysql.png";
import Vb from "../Images/vb.png";
import "./About.css";

export function About() {
  const profeciencyHigh = [Js, Linux, Node, ReactIcon, Mysql];
  const profeciencyMid = [Apache, Css, Git, Html, Vb];
  const profeciencyLow = [Angular, Cpp, Java, Python, Firebase];
  return (
    <React.Fragment>
      <hr />
      <div className="py-3 p-2 text-center aboutHeader" id="About">
        <h1 className="display-4">About Me</h1>
      </div>
      <hr />
      <div className="aboutBg d-flex flex-wrap justify-content-center">
        <div>
          <p className="lead py-4 aboutP">
            My name is TJ Brackett. I am a software engineer who specializes in
            building applications specific to the business needs of my clients.
            I have experience in software development, database design and
            implementation, native applications, full stack web development, and
            server management.
          </p>
          <p className="lead aboutP">
            You can see more of what I do on my&nbsp;
            <a className="aboutLink" href="https://twitter.com/TJBrackett">
              Twitter
            </a>
            ,&nbsp;
            <a
              className="aboutLink"
              href="https://www.linkedin.com/in/tjbrackett/"
            >
              LinkedIn
            </a>
            ,&nbsp;
            <a
              className="aboutLink"
              href="https://stackoverflow.com/users/11122711/tj-brackett"
            >
              Stack Overflow
            </a>
            ,&nbsp;and&nbsp;
            <a className="aboutLink" href="https://github.com/TJBrackett">
              GitHub
            </a>
          </p>
        </div>
        <div className="text-center">
          <div className="techHeader lead">Technologies I've Used</div>
          <hr className="hrAbout" />
          <div>
            <div className="lead techLevel">I've Extensively Used</div>
          </div>
          <div className="techRow col-12">
            {profeciencyHigh.map(tech => (
              <img className="techImg1" key={tech} src={tech} />
            ))}
          </div>
          <hr className="hrAbout" />
          <div>
            <div className="lead techLevel">I Frequently Use</div>
          </div>
          <div className="techRow col-12">
            {profeciencyMid.map(tech => (
              <img className="techImg2" key={tech} src={tech} />
            ))}
          </div>
          <hr className="hrAbout" />
          <div>
            <div className="lead techLevel">I've Dabbled In</div>
          </div>
          <div className="techRow col-12">
            {profeciencyLow.map(tech => (
              <img className="techImg3 img-fluid" key={tech} src={tech} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function Render() {
  return <About />;
}

export default Render;
