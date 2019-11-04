import React from "react";
import "./Blog.css";

function Blog() {
  let test = "";
  for (let i = 0; i < 1000; i++) {
    test += " blog test";
  }
  return (
    <React.Fragment>
      <div className="blogBackground" id="Blog"></div>
      <div className="postContainer row">
        <div className="col-lg-2 col-md-2 col-sm-0"></div>
        <div className="col-lg-8 col-md-8 col-sm-12 middleSection">
          <p className="testP">{test}</p>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-0"></div>
      </div>
    </React.Fragment>
  );
}

export default Blog;