import React from 'react';
import './App.css';

function Navbar(){
  return (
  <div>navbar</div>
  )
}


function Header(){
  return (
  <div>Header</div>
  )
}

function Projects(){
  return (
  <div>Projects</div>
  )
}

function Experience(){
  return (
  <div>Experience</div>
  )
}

function Footer(){
  return (
  <div>Footer</div>
  )
}

function App() {
  return (
    <React.Fragment>
    <Navbar/>
    <Header/>
    <Projects/>
    <Experience/>
    <Footer/>
    </React.Fragment>
  )
}

export default App;
