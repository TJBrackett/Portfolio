import React from 'react';
import { Card, Button } from "react-bootstrap";


function Project(title, description, img, pageLink, githubLink) {
  console.log(img);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>{title}</Card.Title>
      <Card.Img src={img} alt="background-image" />
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