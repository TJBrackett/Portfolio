import React from "react";
import { proficiency } from "./Tech/TechInfo.js";
import { Tech } from "./Tech/Tech.js";
import "./About.css";

export function About() {
  return (
    <React.Fragment>
      <hr />
      <div className="py-3 p-2 text-center aboutHeader" id="About">
        <h1 className="display-4" data-aos="fade-down" data-aos-duration="1750">About Me</h1>
      </div>
      <hr />
      <div className="aboutBg">
        <div className="d-flex justify-content-center">
          <p className="lead py-4 aboutP">
            My name is TJ Brackett. I am a software engineer who specializes in
            building applications specific to the business needs of my clients.
            I have experience in software development, database design and
            implementation, native applications, full stack web development, and
            server management.
          </p>
        </div>
        <div className="text-center">
          <div className="techHeader lead">Technologies I've Used</div>
          <hr className="hrAbout" />
          <div className="d-flex justify-content-center">
            <div className="row m-0 p-0 justify-content-center" data-aos="fade-down" data-aos-duration="1750">
              {proficiency.map(tech => (
                <Tech
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                ></Tech>
              ))}
            </div>
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