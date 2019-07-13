import React from 'react';
import "./Footer.css"



function Footer() {
  return (
    <React.Fragment>
      <div className="container-fluid text-center footer text-white py-2">
        <div>
          <a href="">
            < i className="fa fa-twitter fa-3x m-3" />
          </a>
          <a href="">
            <i class="fa fa-linkedin fa-3x m-3" />
          </a>
          <a href="">
            <i className="fa fa-stack-overflow fa-3x m-3" />
          </a>
          <a href="https://github.com/TJBrackett">
            <i className="fa fa-lg fa-github fa-3x m-3" />
          </a>
        </div>
      </div>
      <div className="container-fluid footer text-center text-white">
        <div>
          © 2019 Joseph Markley All Rights Reserved.
      </div>
      </div>
    </React.Fragment>
  )
}


export default Footer