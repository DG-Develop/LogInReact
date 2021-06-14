import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from '../containers/Home'
import LogIn from '../containers/LogIn'
import Register from '../containers/Register'

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/" component={LogIn}/>
                <Route exact path="/signup" component={Register}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App
