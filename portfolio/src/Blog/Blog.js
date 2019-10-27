import React, {useEffect, useState} from 'react'
import '../App/App.css'
import {Link} from 'react-router-dom'

function Blog() {
    const [quote, setQuote] = useState()
    useEffect(() => {
        setQuote(`Some beautiful paths can't be discovered without getting lost." ― Erol Ozan`)
    })
    return (
      <div className="headerBackground" id="Header">
        <div className="text-center text-white caption">
          <h1 className="display-2" id="Home">Blog</h1>
          <p className="lead">{process.env.NODE_ENV}</p>
          <Link type="input" className="btn btn-outline-light btn-lg headerBtn" to="/" offset="80">Go Back</Link>
        </div>
      </div>
    )
}

export default Blog;