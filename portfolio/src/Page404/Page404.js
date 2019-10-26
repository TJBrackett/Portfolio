import React, {useEffect, useState} from 'react'
import '../App/App.css'
import { Link } from 'react-router-dom'
import { quotes404 } from './Page404Quotes.js'

function Page404() {
    const [quote, setQuote] = useState()
    useEffect(() => {
        const randNum = Math.floor(Math.random() * quotes404.length)
        setQuote(quotes404[randNum])
    })
    return (
      <div className="headerBackground" id="Header">
        <div className="text-center text-white caption">
          <h1 className="display-2" id="Home">404</h1>
          <p className="lead">{quote}</p>
          <Link type="input" className="btn btn-outline-light btn-lg headerBtn" to="/" offset="80">Go Back</Link>
        </div>
      </div>
    )
}

export default Page404;