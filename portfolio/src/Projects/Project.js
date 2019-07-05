import React from 'react';
import { Card, Button } from "react-bootstrap";


function Project(title, description, img, pageLink, githubLink) {
  let pic = "";
  for (let key in img) {
    pic = img[key];
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>{title}</Card.Title>
      <Card.Img src={pic} alt="background-image" />
      <Card.Body>
        <Card.Text>
          {description}
        </Card.Text>
        <Button href={githubLink}>GitHub</Button>
        <Button href={pageLink}>Check it out</Button>
      </Card.Body>
    </Card>
  );
}



export default Project;