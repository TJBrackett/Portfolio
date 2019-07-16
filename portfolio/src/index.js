import React from 'react'
import ReactDOM from 'react-dom'
import "bootstrap/dist/css/bootstrap.css"
import './index.css'
import App from './App/App.js';
import * as serviceWorker from './serviceWorker'
import Contact from './Contact/Contact.js'
import { BrowserRouter, Route } from "react-router-dom"
import About from "./About/About.js"
import { NOTFOUND } from 'dns';


ReactDOM.render(
    <BrowserRouter>
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/contact' component={Contact} />
        <Route path='/about' component={About} />
        <Route component={NOTFOUND} />
    </Switch>
    </BrowserRouter>,
    document.getElementById('root')
)

serviceWorker.unregister();
