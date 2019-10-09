import React from 'react';
import Angular from "../Images/angular.png"
import Apache from "../Images/apache.png"
import Assembly from "../Images/assembly.png"
import Bash from "../Images/bash.png"
import Bootstrap from "../Images/bootstrap.png"
import Cpp from "../Images/cpp.png"
import Css from "../Images/css.png"
import Firebase from "../Images/firebase.png"
import Git from "../Images/git.png"
import Html from "../Images/html.png"
import Java from "../Images/java.png"
import Js from "../Images/js.png"
import Linode from "../Images/linode.png"
import Linux from "../Images/linux.png"
import Node from "../Images/node.png"
import Python from "../Images/python.png"
import ReactIcon from "../Images/react.png"
import Ssl from "../Images/ssl.png"
import Mysql from "../Images/mysql.png"
import Vb from "../Images/vb.png"
import "./About.css"

export function About() {
  return (
      <div className="container-fluid aboutBg" id="About">
        <div className="p-5 text-center">
          <h1 className="display-4 text-center aboutHeader">TJ Brackett</h1>
          <p className="lead aboutP">I am a software engineer who specializes in building applications specific to the business needs of my clients.
              I have done work in software development, database design and implementation, native applications, full stack web development, and server management.</p>
          <div>
            <h2 className="aboutTech">Technologies I have worked with</h2>
            <div className="p-2 mt-5 d-flex justify-content-center flex-wrap">
              <div>
                <img className="aboutIcon" src={Angular} alt="Angular"></img><br></br>
                <h5>Angular</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Apache} alt="Apache"></img><br></br>
                <h5>Apache</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Assembly} alt="Assembly"></img><br></br>
                <h5>Assembly</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Bash} alt="Bash"></img><br></br>
                <h5>Bash</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Bootstrap} alt="Bootstrap"></img><br></br>
                <h5>Bootstrap</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Cpp} alt="Cpp"></img><br></br>
                <h5>C++</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Css} alt="Css"></img><br></br>
                <h5>CSS3</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Firebase} alt="Firebase"></img><br></br>
                <h5>Firebase</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Git} alt="Git"></img><br></br>
                <h5>Git</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Html} alt="Html"></img><br></br>
                <h5>HTML5</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Java} alt="Java"></img><br></br>
                <h5>Java</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Js} alt="Js"></img><br></br>
                <h5>Javascript</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Linode} alt="Linode"></img><br></br>
                <h5>Linode</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Linux} alt="Linux"></img><br></br>
                <h5>Linux</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Mysql} alt="Mysql"></img><br></br>
                <h5>MySQL</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Node} alt="Node"></img><br></br>
                <h5>NodeJS</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Python} alt="Python"></img><br></br>
                <h5>Python</h5>
              </div>
              <div>
                <img className="aboutIcon" src={ReactIcon} alt="React"></img><br></br>
                <h5>React</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Ssl} alt="SSL"></img><br></br>
                <h5>SSL</h5>
              </div>
              <div>
                <img className="aboutIcon" src={Vb} alt="Vb"></img><br></br>
                <h5>Visual Basic</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

function Render() {
  return (
      <About />
  )
}

export default Render