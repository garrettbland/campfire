import React from 'react'
import { Router } from '@reach/router'

/**
 * Views
 */
import Home from './views/Home'
import Blocks from './views/Blocks'
import NotFound from './views/NotFound'

const Navigation = () => {
    return (
        <Router>
            <Home path="/" />
            <Blocks path="/blocks" />
            <NotFound default />
        </Router>
    )
}

export default Navigation
