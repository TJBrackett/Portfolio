import React, { useState, useEffect } from "react";
import "./Blog.css";
import '../index.css'
import Konami from "react-konami-code";
import Footer from "../Footer/Footer.js";
import BlogPosts from './BlogPosts/BlogPosts.js'
import BlogNav from './BlogNav/BlogNav.js'

function Blog() {
  //Need to create card layout and receive cards
  const [allPosts, setAllPost] = useState([{
    id: '',
    title: '',
    body: ''
  }])
  const [search, setSearch] = useState('')
  
  useEffect( () => {
    GetPosts();
  });

const userSearch = (data) => {
  setSearch(data)
}

const GetPosts = () => {
    const getPostUrl = "http://jsonplaceholder.typicode.com/posts";
    fetch(getPostUrl)
      .then(res => res.json())
      .then(json => {
        setAllPost(json)
      })
  }

  return (
    <React.Fragment>
      <div className="blogBackground" id="Blog"></div>
      <div className="postContainer row" id="Posts">
        <div className="col-lg-2 col-md-2 col-sm-0 sideSection"></div>
        <div className="col-lg-8 col-md-8 col-sm-12 middleSection">
        <BlogNav 
          blogPosts={allPosts}
          sendData={userSearch}
        />
        <div className="blogHeaderBg">
        <div className="blogHeader text-center py-3 p-2">
        <h1 className="display-4"  id="BlogHome">My Blog</h1>
        </div>
        </div>
          {allPosts.map(post => (
            <BlogPosts
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
          <div className="blogFooter">
          <Footer />
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-0 sideSection"></div>
      </div>
    </React.Fragment>
  );
}

function Login() {
  window.location.assign('/blog/dev')
}

function Render() {
  const secretCode = [17, 57, 53, 50, 49];

  return (
    <React.Fragment>
      <Blog />
      <Konami
        code={secretCode}
        action={Login}
        resetDelay={3000}
        timeout={5000}
      ></Konami>
    </React.Fragment>
  );
}

export default Render;
