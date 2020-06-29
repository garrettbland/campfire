import React from 'react'
import { Router } from '@reach/router'

/**
 * Views
 */
import Home from './views/Home'
import NotFound from './views/NotFound'

const Navigation = () => {
    return (
        <Router>
            <Home path="/" />
            <NotFound default />
        </Router>
    )
}

export default Navigation
