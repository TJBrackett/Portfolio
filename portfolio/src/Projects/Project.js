import React from 'react';
import "./Project.css"


function Project(title, description, img, pageLink, githubLink, date) {
  let pic = ''
  
  for (let key in img) {
    pic = img[key];
  }

  return (
      <div className="projCard">
        <div className="card bg-color border-dark border rounded-0 m-0 p-0">
          <div className="projImg">
            <img className="img-fluid card-img-top" src={pic} alt="projectPic" />
            <div className="projBottom">
              <h5 className="card-title text-center mt-2">{title}</h5>
              <p className="card-text text-center text-wrap">{date} - {description}</p>
            </div>
            <div className="btn-group projBtn" role="group">
              <a type="button" className="githubBtn border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-6 text-center" href={githubLink} target="_blank" rel="noopener noreferrer">Github</a>
              <a type="button" className="pageLinkBtn border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-6 text-center" href={pageLink} target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Project;