import React from 'react'
import './App.css'
import {Header} from "./presentation/header/Header"
import {RoutesConfig} from "./route/Route"
import {Router} from "react-router"
import * as history from 'history'

const browserHistory = history.createBrowserHistory()

const App: React.FC = () => {

    return <Router history={browserHistory}>
        <div>
            <Header/>
            <RoutesConfig/>
        </div>
    </Router>
}

export default App
