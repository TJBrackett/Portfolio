import React, { useState } from 'react';
import "./Project.css"


function Project(title, description, img, pageLink, githubLink, date) {
  let pic = "";
  for (let key in img) {
    pic = img[key];
  }

  const [modalTitle, setTitle] = useState('')
  const [modalDesc, setDesc] = useState('')
//try just doing a hover card for more info
  return (
    <React.Fragment>
      <div class="modal fade" id="projModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">{modalTitle}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {modalDesc}
            </div>
            <div class="modal-footer">
              <button type="button" class="modalBtn btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div id="projCard">
        <div className="card bg-color border-dark border rounded-0 m-0 p-0">
          <div id="projImg">
            <img className="img-fluid card-img-top" src={pic} alt="projectPic" />
            <div id="projTop">
              {/* <a type="button" className="moreInfoBtn border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-12 text-center" href={pageLink} target="_blank" rel="noopener noreferrer">More Info</a> */}
              <button type="button" class="moreInfoBtn border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-12 text-center" data-toggle="modal" data-target="#projModal">More Info</button>
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
    </React.Fragment>
  );
}


export default Project;