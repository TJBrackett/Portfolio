import React from 'react'
import ReactDOM from 'react-dom'
import "bootstrap/dist/css/bootstrap.css"
import './index.css'
import App from './App/App.js';
import * as serviceWorker from './serviceWorker'
import Contact from './Contact/Contact.js'
import { HashRouter, Route, Switch } from "react-router-dom"
import About from "./About/About.js"


ReactDOM.render(
    <HashRouter>
        <Route exact path='/' component={App} />
        <Route exact path='/contact' component={Contact} />
        <Route extact path='/about' component={About} />
    </HashRouter>,
    document.getElementById('root')
)

serviceWorker.unregister();
