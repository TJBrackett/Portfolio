import React, { useState } from 'react';
import "./Project.css"


function Project(title, description, img, pageLink, githubLink, date) {
  let pic = "";
  for (let key in img) {
    pic = img[key];
  }

//try just doing a card for more info on click
  return (
      <div id="projCard">
        <div className="card bg-color border-dark border rounded-0 m-0 p-0">
          <div id="projImg">
            <img className="img-fluid card-img-top" src={pic} alt="projectPic" />
            <div id="projTop">
              <button type="button" class="moreInfoBtn border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-12 text-center">More Info</button>
            </div>
            <div id="projBottom">
              <h5 className="card-title text-center mt-2">{title}</h5>
              <p className="card-text  text-center text-wrap">{date} - {description}</p>
            </div>
            <div className="btn-group" role="group" id="projBtn">
              <a type="button" className="githubBtn border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-6 text-center" href={githubLink} target="_blank" rel="noopener noreferrer">Github</a>
              <a type="button" className="pageLinkBtn border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-6 text-center" href={pageLink} target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </div>
        </div>
      </div>
  );
}


export default Project;