import React, {useState} from "react";
import "./BlogNav.css";

export default function BlogNav(props) {
    const [search, setSearch] = useState('')
    const userSearch = (event) => {
        setSearch(event.target.value)
        props.sendData(search)
    }
  return (
    <nav className="nav-bg navbar sticky-top navbar-expand-md navbar-light">
      <div>
        <a 
            className="logo"
            href="#BlogHome"
            offset="400"
        >
          TJB
        </a>
      </div>
      <button
        className="navbar-toggler ml-auto mt-3 mb-2"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={
          window.innerWidth < 768
            ? "navbar collapse navbar-collapse justify-content-center"
            : "navbar collapse navbar-collapse"
        }
        id="navbarSupportedContent"
      >
        <div className="navbar-nav"></div>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <input
                type="text"
                className="blogSearch"
                placeholder="Search by Title or #Tag."
                value={search}
                onChange={userSearch}
              ></input>
            </li>
            <li className="nav-item">
              <a
                className="link nav-link text-white font-weight-bold"
                data-target=".navbar-collapse.show"
                href="/"
              >
                <div className="navLink">Home</div>
                <hr className="navHr" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
