import React from 'react';
import Angular from "../Images/angular.png"
import Apache from "../Images/apache.png"
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
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export function About() {
  return ( 
    <div className="aboutBg" id="About">
      <div className="py-3 p=2 text-center aboutHeader">
        <h1 className="display-4">TJ Brackett</h1>
      </div>
      <p className="lead py-4 aboutP">I am a software engineer who specializes in building applications specific to the business needs of my clients.
              I have experience in software development, database design and implementation, native applications, full stack web development, and server management.</p>
      <div>
        <div className="row container-fluid">
          <div className="mt-1 mb-3 d-flex justify-content-center flex-wrap col-lg-6 col-md-12 col-sm-12">
            <div className="col-12">
              <h2 className="aboutTech">Technologies I have worked with</h2>
            </div>
            <div>
              <img className="aboutIcon" src={Angular} alt="Angular"></img><br></br>
              {/* <h5 className="techName">Angular</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Apache} alt="Apache"></img><br></br>
              {/* <h5 className="techName">Apache</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Bash} alt="Bash"></img><br></br>
              {/* <h5 className="techName">Bash</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Bootstrap} alt="Bootstrap"></img><br></br>
              {/* <h5 className="techName">Bootstrap</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Cpp} alt="Cpp"></img><br></br>
              {/* <h5 className="techName">C++</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Css} alt="Css"></img><br></br>
              {/* <h5 className="techName">CSS3</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Firebase} alt="Firebase"></img><br></br>
              {/* <h5 className="techName">Firebase</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Git} alt="Git"></img><br></br>
              {/* <h5 className="techName">Git</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Html} alt="Html"></img><br></br>
              {/* <h5 className="techName">HTML5</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Java} alt="Java"></img><br></br>
              {/* <h5 className="techName">Java</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Js} alt="Js"></img><br></br>
              {/* <h5 className="techName">Javascript</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Linode} alt="Linode"></img><br></br>
              {/* <h5 className="techName">Linode</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Linux} alt="Linux"></img><br></br>
              {/* <h5 className="techName">Linux</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Mysql} alt="Mysql"></img><br></br>
              {/* <h5 className="techName">MySQL</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Node} alt="Node"></img><br></br>
              {/* <h5 className="techName">NodeJS</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Python} alt="Python"></img><br></br>
              {/* <h5 className="techName">Python</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={ReactIcon} alt="React"></img><br></br>
              {/* <h5 className="techName">React</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Ssl} alt="SSL"></img><br></br>
              {/* <h5 className="techName">SSL</h5> */}
            </div>
            <div>
              <img className="aboutIcon" src={Vb} alt="Vb"></img><br></br>
              {/* <h5 className="techName">Visual Basic</h5> */}
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="TJBrackett"
              options={{ 
                height: 400
              }}
              noScrollbar
            />
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