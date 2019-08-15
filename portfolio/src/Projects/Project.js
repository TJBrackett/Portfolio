import React from 'react';
import "./Project.css"


function Project(title, description, img, pageLink, githubLink, date) {
  let pic = ''
  // let counter = 0

  for (let key in img) {
    pic = img[key];
  }

  // const [info, setInfo] = useState('More')

  // for (let key in title) {
  //   test1 += title[key];
  // }
  // const [test, setTest] = useState('')

  // console.log(`${counter} on load`)
  
  // function updateInfo() {
  //   if (counter !== 0) {
  //     counter = 0
  //     console.log(`${counter} if`)
  //     return setInfo('More')
  //   } else {
  //     counter = 1
  //     console.log(`${counter} else`)
  //     return setInfo('Less')
  //   }
  // }

  //try just doing a card for more info on click
  return (
      <div id="projCard">
        <div className="card bg-color border-dark border rounded-0 m-0 p-0">
          <div id="projImg">
            <img className="img-fluid card-img-top" src={pic} alt="projectPic" />
            {/* <div id="projTop">
              <button type="button" className="moreInfoBtn border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-12 text-center" data-toggle="modal" data-target="#projModal" onClick={() => updateInfo()}>{info} Info</button>
            </div> */}
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