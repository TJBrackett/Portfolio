import React from "react";
import {
  profeciencyHigh,
  profeciencyMid,
  profeciencyLow
} from "./Tech/TechInfo.js";
import { Tech } from "./Tech/Tech.js";
import "./About.css";

export function About() {
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
              <Tech key={tech.icon} icon={tech.icon} name={tech.name} level={tech.level}></Tech>
            ))}
          </div>
          <hr className="hrAbout" />
          <div>
            <div className="lead techLevelTwo">Novice</div>
          </div>
          <div className="techRow col-12">
            {profeciencyMid.map(tech => (
              <Tech key={tech.icon} icon={tech.icon} name={tech.name} level={tech.level}></Tech>
            ))}
          </div>
          <hr className="hrAbout" />
          <div>
            <div className="lead techLevelThree">Dabbled</div>
          </div>
          <div className="techRow col-12">
            {profeciencyLow.map(tech => (
              <Tech key={tech.icon} icon={tech.icon} name={tech.name} level={tech.level}></Tech>
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
