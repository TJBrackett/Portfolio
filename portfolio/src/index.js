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
// import { BrowserRouter, Route } from "react-router-dom"
// import Page404 from './Page404/Page404.js'
// import Blog from './Blog/Blog.js'
// ReactDOM.render(
//     <BrowserRouter>
//         <Route exact path='/' component={App} />
//         <Route exact path='/blog' component={Blog} />
//         <Route exact path='/*' component={Page404} />
//     </BrowserRouter>,
//     document.getElementById('root')
// )