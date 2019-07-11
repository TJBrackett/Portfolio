import React from 'react'
import ReactDOM from 'react-dom'
import "bootstrap/dist/css/bootstrap.css"
import './index.css'
import App from './App';
import * as serviceWorker from './serviceWorker'
import Contact from './Contact.js'
import { BrowserRouter, Route, withRouter } from "react-router-dom"
import About from "./About" 

ReactDOM.render(
    <BrowserRouter>
        <Route exact path='/' component={App} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
    </BrowserRouter>,
    document.getElementById('root')
)

serviceWorker.unregister();
