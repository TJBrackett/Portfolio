import React from 'react';
import "./Footer.css"



function Footer() {
  return (
    <React.Fragment>
      <div className="container-fluid text-center footer text-white py-5">
        <div>
        <a href="">
          < i className="fa fa-twitter fa-4x m-3" />
        </a>
        <a href="">
          <i class="fa fa-linkedin fa-4x m-3" />
        </a>
        <a href="">
          <i className="fa fa-stack-overflow fa-4x m-3" />
        </a>
        <a href="">
          <i className="fa fa-lg fa-github fa-4x m-3" />
        </a>
        </div>
      </div>
    </React.Fragment>
  )
}


export default Footer