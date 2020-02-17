import React, {useEffect, useState} from 'react';
import "./Project.css"


function Project(title, description, img, pageLink, githubLink, date, role) {
  let pic = ''
  
  for (let key in img) {
    pic = img[key];
  }
  const [showButtons, setButtons] = useState()
  function Buttons() {
    if (pageLink === "") {
      return(
     <div className="singleProjBtn" role="group">
       <a type="button" className="btn singleBtn btn-secondary btn-outline-dark btn-lg col-6 text-center" href={githubLink} target="_blank" rel="noopener noreferrer">Github</a>
     </div>
    )} else if (githubLink === "") {
      return(
     <div className="singleProjBtn" role="group">
       <a type="button" className="btn singleBtn btn-secondary btn-outline-dark btn-lg col-6 text-center" href={pageLink} target="_blank" rel="noopener noreferrer">Website</a>
     </div>
      )} else {
      return(
     <div className="btn-group projBtn" role="group">
       <a type="button" className="btn githubBtn btn-secondary btn-outline-dark btn-lg col-6 text-center" href={githubLink} target="_blank" rel="noopener noreferrer">Github</a>
       <a type="button" className="btn pageLinkBtn btn-secondary btn-outline-dark btn-lg col-6 text-center" href={pageLink} target="_blank" rel="noopener noreferrer">Website</a>
     </div>
      )}
  }

  useEffect(() => {
    setButtons(Buttons())
  }, [])

  return (
      <div className="projCard" data-aos="fade-down" data-aos-duration="1750">
        <div className="card bg-color border-dark border rounded-0 m-0 p-0">
          <div className="projImg">
            <img className="img-fluid card-img-top" src={pic} alt="projectPic" />
            <div className="projBottom">
              <h5 className="card-title text-center mt-2">{title}</h5>
              <p className="card-text text-center text-wrap">{description}<br></br>{role}<br></br>{date}</p>
              {/* <p className="card-text text-center text-wrap">{role}</p>
              <p className="card-text text-center text-wrap">{date}</p> */}
            </div>
            {showButtons}
          </div>
        </div>
      </div>
  );
}

export default Project;