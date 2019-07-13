import React from 'react';
import "./Footer.css"



function Footer() {
  return (
    <React.Fragment>
      <div className="container-fluid text-center footer text-white py-2">
        <div>
          <a href="https://twitter.com/TJBrackett">
            < i className="fa fa-twitter fa-3x m-3" />
          </a>
          <a href="https://www.linkedin.com/in/tj-brackett-742478a8/">
            <i class="fa fa-linkedin fa-3x m-3" />
          </a>
          <a href="https://stackoverflow.com/users/11122711/tj-brackett">
            <i className="fa fa-stack-overflow fa-3x m-3" />
          </a>
          <a href="https://github.com/TJBrackett">
            <i className="fa fa-lg fa-github fa-3x m-3" />
          </a>
        </div>
      </div>
      <div className="container-fluid footer text-center text-white">
        <div>
          © 2019 TJ Brackett All Rights Reserved.
      </div>
      </div>
    </React.Fragment>
  )
}


export default Footer