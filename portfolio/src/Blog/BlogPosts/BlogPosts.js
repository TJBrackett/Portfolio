import React from "react";
import "./BlogPosts.css";

export default function BlogPosts(props) {
  return (
      <div class="card" style={{ width: "18rem" }}>
        <img class="card-img-top" src="..." alt={props.userId} />
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text">{props.body}</p>
          <a href="#" class="btn btn-primary">
            Read More...
          </a>
          <p className="card-text"><small className="text-muted">ID #: {props.id}</small></p>
        </div>
      </div>
  );
}
