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
        <h1 className="display-4" data-aos="zoom-in" data-aos-duration="1750">About Me</h1>
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
          <div>
            <div className="lead techLevelOne">Intermediate</div>
          </div>
          <div className="d-flex justify-content-center" data-aos="zoom-up" data-aos-duration="1750">
            <div className="row m-0 p-0 justify-content-center">
              {profeciencyHigh.map(tech => (
                <Tech
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  level={tech.level}
                ></Tech>
              ))}
            </div>
          </div>
          <hr className="hrAbout" />
          <div>
            <div className="lead techLevelTwo">Novice</div>
          </div>
          <div className="d-flex justify-content-center" data-aos="zoom-up" data-aos-duration="1750">
            <div className="row m-0 p-0 justify-content-center">
              {profeciencyMid.map(tech => (
                <Tech
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  level={tech.level}
                ></Tech>
              ))}
            </div>
          </div>
          <hr className="hrAbout" />
          <div>
            <div className="lead techLevelThree">Dabbled</div>
          </div>
          <div className="d-flex justify-content-center" data-aos="zoom-up" data-aos-duration="1750">
            <div className="row m-0 p-0 justify-content-center">
              {profeciencyLow.map(tech => (
                <Tech
                  key={tech.name}
                  icon={tech.icon}
                  name={tech.name}
                  level={tech.level}
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
