import React from 'react'
import { Router } from '@reach/router'
import Home from '../views/Home'
import Test from '../views/Test'
import NotFound from '../views/NotFound'

const AppRouter = () => (
    <Router>
        <Home path="/" />
        <Test path="/test" />
        <NotFound default />
    </Router>
)

export default AppRouter
