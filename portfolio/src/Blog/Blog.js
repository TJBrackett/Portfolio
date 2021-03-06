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
    userId: '',
    id: '',
    title: '',
    body: ''
  }])
  const [sortedPosts, setSortedPost] = useState([{
    userId: '',
    id: '',
    title: '',
    body: ''
  }])
  const [displayedPosts, setDisplayedPosts] = useState([{
    userId: '',
    id: '',
    title: '',
    body: ''
  }])

  const [isLoading, setIsLoading] = useState(true)
  const getPostUrl = "http://jsonplaceholder.typicode.com/posts";
  
  useEffect(() => {
    async function GetPosts() {
    await fetch(getPostUrl)
      .then(res => res.json())
      .then(json => {
        setAllPost(json)
        setDisplayedPosts(allPosts)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
    }
    GetPosts()
  }, [isLoading])

  //Updates the screen everytime a character is added to the searchbar in nav.
  useEffect(() => {
    if (sortedPosts.length > 0) {
      setDisplayedPosts(sortedPosts)
      // if (displayedPosts.length = 0) {
      //   // Display something indicating there are no results for their search
      // }
    } else {
      setDisplayedPosts(allPosts)
    }
  }, [isLoading, sortedPosts]);

const userSearch = (data) => {
  setSortedPost(data)
}
  //test

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
        <div className="d-flex justify-content-center flex-wrap">
          {isLoading && <p>Fetching Posts</p>}
          {displayedPosts.map(post => (
            <BlogPosts
              key={post.id}
              userId={post.userId}
              id={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
          </div>
          <div className="blogFooter">
          <Footer />
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-0 sideSection"></div>
      </div>
    </React.Fragment>
  );
}

function DevPage() {
  window.location.assign('/blog/dev')
}

export default function Render() {
  const secretCode = [17, 57, 53, 50, 49];

  return (
    <React.Fragment>
      <Blog />
      <Konami
        code={secretCode}
        action={DevPage}
        resetDelay={3000}
        timeout={5000}
      ></Konami>
    </React.Fragment>
  );
}