import React from 'react';
import "./Footer.css"



function Footer() {
  return (
    <React.Fragment>
      <div className="container-fluid text-center footer text-white py-2">
        <div>
          <a className="footer-link" href="https://twitter.com/TJBrackett" target="_blank" rel="noopener noreferrer">
            < i className="fa fa-twitter fa-3x m-3" />
          </a>
          <a className="footer-link" href="https://www.linkedin.com/in/tjbrackett/" target="_blank" rel="noopener noreferrer">
            <i class="fa fa-linkedin fa-3x m-3" />
          </a>
          <a className="footer-link" href="https://stackoverflow.com/users/11122711/tj-brackett" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-stack-overflow fa-3x m-3" />
          </a>
          <a className="footer-link" href="https://github.com/TJBrackett" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-lg fa-github fa-3x m-3" />
          </a>
        </div>
      </div>
      <div className="container-fluid footer text-center text-white">
        <div>
          © 2019 TJ Brackett
      </div>
      </div>
    </React.Fragment>
  )
}


export default Footer