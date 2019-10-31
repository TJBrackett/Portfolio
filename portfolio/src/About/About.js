import React from 'react';
// import Angular from "../Images/angular.png"
// import Apache from "../Images/apache.png"
// import Bash from "../Images/bash.png"
// import Bootstrap from "../Images/bootstrap.png"
// import Cpp from "../Images/cpp.png"
// import Css from "../Images/css.png"
// import Firebase from "../Images/firebase.png"
// import Git from "../Images/git.png"
// import Html from "../Images/html.png"
// import Java from "../Images/java.png"
// import Js from "../Images/js.png"
// import Linode from "../Images/linode.png"
// import Linux from "../Images/linux.png"
// import Node from "../Images/node.png"
// import Python from "../Images/python.png"
// import ReactIcon from "../Images/react.png"
// import Ssl from "../Images/ssl.png"
// import Mysql from "../Images/mysql.png"
// import Vb from "../Images/vb.png"
import "./About.css"
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export function About() {
  return (
    <div className="aboutBg" id="About">
      <div className="py-3 p-2 text-center aboutHeader">
        <h1 className="display-4">About Me</h1>
      </div>
      <p className="lead py-4 aboutP">My name is TJ Brackett. I am a software engineer who specializes in building applications specific to the business needs of my clients.
              I have experience in software development, database design and implementation, native applications, full stack web development, and server management.</p>

        <div className="tweetsContainer col-lg-12 col-md-12 col-sm-12">
          <div className="col-12">
            <h2 className="aboutTitle">What I'm up to now</h2>
          </div>
          <TwitterTimelineEmbed className="tweets col-6"
            sourceType="profile"
            screenName="TJBrackett"
            options={{
              height: 400
            }}
            noScrollbar
            noHeader
            noFooter
            theme="dark"
          />
        </div>
      </div>
    /* </div>
       <div className="part">
       <div className="hexa">
         <div className="hex1">
           <div className="hex2">
           <img className="img-fluid aboutImg" src={Me} alt="Me" width="320" height="313" />
           </div>
         </div>
       </div>
     </div> */
  )
}

function Render() {
  return (
    <About />
  )
}

export default Render