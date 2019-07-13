import React from 'react'
import ReactDOM from 'react-dom'
import "bootstrap/dist/css/bootstrap.css"
import './index.css'
import App from './App/App.js';
import * as serviceWorker from './serviceWorker'
import Contact from './Contact/Contact.js'
import { BrowserRouter, Route } from "react-router-dom"
import About from "./About/About.js" 
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
}

const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
)
ReactDOM.render(
    <BrowserRouter>
        <Route exact path='/' component={App} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
    </BrowserRouter>,
    document.getElementById('root')
)

serviceWorker.unregister();
