import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

/**
 * Views
 */
import Home from './views/Home'
import NotFound from './views/NotFound'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
