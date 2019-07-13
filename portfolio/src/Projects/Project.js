import React from 'react';
import { Card, Button } from "react-bootstrap";
import "./Project.css"


function Project(title, description, img, pageLink, githubLink) {
  let pic = "";
  for (let key in img) {
    pic = img[key];
  }

  return (
    // <Card style={{ width: '18rem' }}>
    //   <Card.Title>{title}</Card.Title>
    //   <Card.Img src={pic} alt="background-image" />
    //   <Card.Body>
    //     <Card.Text>
    //       {description}
    //     </Card.Text>
    //     <Button href={githubLink}>GitHub</Button>
    //     <Button href={pageLink}>Check it out</Button>
    //   </Card.Body>
    // </Card>
    <div>
      <div className="card bg-color border-dark border rounded-0 m-2">
        <h5 className="card-title text-center">{title}</h5>
        <img className="img-fluid card-img-top" src={pic} alt="Card image"></img>
        <div className="card-body">
          <p className="card-text">{description}</p>
        </div>
        <div className="btn-group" role="group">
          <a type="button" className="border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-6 text-center" href={githubLink}>Github</a>
          <a type="button" className="border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-6 text-center" href={pageLink}>Check it out</a>
        </div>
      </div>
    </div>
  );
}


export default Project;


{/* <div className="col-lg-3 col-md-6 mb-4 col-sm-12">
<div className="card bg-color border-dark border rounded-0">
  <h5 className="card-title text-center">{title}</h5>
  <img className="img-fluid card-img-top" src={pic} alt="Card image"></img>
  <div className="card-body">
    <p className="card-text">{description}</p>
  </div>
  <div className="btn-group" role="group">
    <button type="button" className="border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-6" href={githubLink}>Github</button>
    <button type="button" className="border rounded-0 border-dark btn-secondary btn-outline-dark btn-lg col-6" href={pageLink}>Check it out</button>
  </div>
</div>
</div> */}