import React from 'react'
import ReactDOM from 'react-dom'
import "bootstrap/dist/css/bootstrap.css"
import './index.css'
import App from './App/App.js';
import * as serviceWorker from './serviceWorker'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();

// Router example. Saving code here for future reference
// import Contact from './Contact/Contact.js'
// import { BrowserRouter, Route } from "react-router-dom"
// import About from "./About/About.js"

// ReactDOM.render(
//     <BrowserRouter>
//         <Route exact path='/' component={App} />
//         <Route exact path='/contact' component={Contact} />
//         <Route exact path='/about' component={About} />
//     </BrowserRouter>,
//     document.getElementById('root')
// )