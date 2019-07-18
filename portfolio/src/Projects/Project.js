import React from 'react';
import "./Project.css"


function Project(title, description, img, pageLink, githubLink, date) {
  let pic = "";
  for (let key in img) {
    pic = img[key];
  }

  return (
    <React.Fragment>
    <div id="projCard">
      <div className="card bg-color border-dark border rounded-0 m-3 p-0">
      <div  id="projImg">
        <img className="img-fluid card-img-top" src={pic} alt="projectPic" />
        <div  id="projTop">
        <h5 className="card-title text-center mt-2">{title}</h5>
        <p className="card-text  text-center">{date} - {description}</p>
        </div>
        <div className="btn-group" role="group"id="projBtn">
          <a type="button" className="border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-6 text-center" href={githubLink} target="_blank" rel="noopener noreferrer">Github</a>
          <a type="button" className="border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-6 text-center" href={pageLink} target="_blank" rel="noopener noreferrer">Website</a>
        </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}


export default Project;