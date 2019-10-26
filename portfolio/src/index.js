import React from 'react'
import ReactDOM from 'react-dom'
import "bootstrap/dist/css/bootstrap.css"
import './index.css'
import App from './App/App.js';
import * as serviceWorker from './serviceWorker'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Page404 from './Page404/Page404.js'
import Blog from './Blog/Blog.js'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={App} />
            <Route path='/blog' exact component={Blog} />
            <Route path='/*' exact component={Page404} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
)

AOS.init()

// ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();

// Router example. Saving code here for future reference