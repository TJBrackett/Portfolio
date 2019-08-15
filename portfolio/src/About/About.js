import React from 'react';
import Navbar from "../Navbar/Navbar.js"
import Footer from "../Footer/Footer.js"
import Angular from "../Images/angular.png"
import Assembly from "../Images/assembly.png"
import Bash from "../Images/bash.png"
import Bootstrap from "../Images/bootstrap.png"
import Cpp from "../Images/cpp.png"
import Css from "../Images/css.png"
import Git from "../Images/git.png"
import Html from "../Images/html.png"
import Java from "../Images/java.png"
import Js from "../Images/js.png"
import Linux from "../Images/linux.png"
import Node from "../Images/node.png"
import Python from "../Images/python.png"
import ReactIcon from "../Images/react.png"
import Sql from "../Images/sql.png"
import Vb from "../Images/vb.png"
import "./About.css"

function About() {
  return (
    <React.Fragment>
      <div className="container-fluid aboutBg">
        <div className="row">
          <div className="rightSide p-5 text-center ">
            <h1 className="display-4 text-center aboutHeader">TJ Brackett</h1>
            <p className="lead aboutP">I am a software engineer who specializes in building applications specific to the business needs of my clients.  
              I have done work in software development, database design and implementation, native applications, full stack web development, and server management.</p>
              <div>
                <h2 className="aboutTech">Technologies I have worked with:</h2>
                <div className="p-5 d-flex justify-content-center flex-wrap">
                  <div>
                    <img className="p-0" src={Angular} alt="Angular"></img><br></br>
                    <h5>Angular</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Assembly} alt="Assembly"></img><br></br>
                    <h5>Assembly</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Bash} alt="Bash"></img><br></br>
                    <h5>Bash</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Bootstrap} alt="Bootstrap"></img><br></br>
                    <h5>Bootstrap</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Cpp} alt="Cpp"></img><br></br>
                    <h5>C++</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Css} alt="Css"></img><br></br>
                    <h5>CSS3</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Git} alt="Git"></img><br></br>
                    <h5>Git</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Html} alt="Html"></img><br></br>
                    <h5>HTML5</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Java} alt="Java"></img><br></br>
                    <h5>Java</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Js} alt="Js"></img><br></br>
                    <h5>Javascript</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Linux} alt="Linux"></img><br></br>
                    <h5>Linux</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Node} alt="Node"></img><br></br>
                    <h5>NodeJS</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Python} alt="Python"></img><br></br>
                    <h5>Python</h5>
                  </div>
                  <div>
                    <img className="p-0" src={ReactIcon} alt="React"></img><br></br>
                    <h5>React</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Sql} alt="Sql"></img><br></br>
                    <h5>SQL</h5>
                  </div>
                  <div>
                    <img className="p-0" src={Vb} alt="Vb"></img><br></br>
                    <h5>Visual Basic</h5>
                  </div>
                </div>
              </div>
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