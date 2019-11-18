import React from "react";
import Angular from "./Icons/angular.png";
import Apache from "./Icons/apache.png";
import Cpp from "./Icons/cpp.png";
import Css from "./Icons/css.png";
import Firebase from "./Icons/firebase.png";
import Git from "./Icons/git.png";
import Html from "./Icons/html.png";
import Java from "./Icons/java.png";
import Js from "./Icons/js.png";
import Linux from "./Icons/linux.png";
import Node from "./Icons/node.png";
import Python from "./Icons/python.png";
import ReactIcon from "./Icons/react.png";
import Mysql from "./Icons/mysql.png";
import Vb from "./Icons/vb.png";
import "./About.css";

export function About() {
  const profeciencyHigh = [{
    icon: Js,
    name: 'Javascript'
  },
  {
    icon: Linux,
    name: 'Linux'
  },
  {
    icon: Node,
    name: 'Node.js'
  },
  {
    icon: ReactIcon,
    name: 'React'
  },
  {
    icon: Mysql,
    name: 'MySQL'
  }];
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
        </div>
        {/* Have images be cards with slide over on hover effects */}
        <div className="text-center">
          <div className="techHeader lead">Technologies I've Used</div>
          <hr className="hrAbout" />
          <div>
            <div className="lead techLevelOne">Intermediate</div>
          </div>
          <div className="techRow col-12">
            {profeciencyHigh.map(tech => (
              <img className="techImgOne" key={tech.icon} src={tech.icon} />
            ))}
          </div>
          <hr className="hrAbout" />
          <div>
            <div className="lead techLevelTwo">Novice</div>
          </div>
          <div className="techRow col-12">
            {profeciencyMid.map(tech => (
              <img className="techImgTwo" key={tech} src={tech} />
            ))}
          </div>
          <hr className="hrAbout" />
          <div>
            <div className="lead techLevelThree">Dabbled</div>
          </div>
          <div className="techRow col-12">
            {profeciencyLow.map(tech => (
              <img className="techImgThree img-fluid" key={tech} src={tech} />
            ))}
          </div>
          <hr className="hrAbout" />
        </div>
      </div>
    </React.Fragment>
  );
}

function Render() {
  return <About />;
}

export default Render;
