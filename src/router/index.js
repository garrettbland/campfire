import React from 'react'
import { Router } from '@reach/router'
import Home from '../views/Home'
import NotFound from '../views/NotFound'

const AppRouter = () => (
    <Router>
        <Home path="/" />
        <NotFound default />
    </Router>
)

export default AppRouter
