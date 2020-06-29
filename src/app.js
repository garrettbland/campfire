import React from 'react'
import './style/style.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import Router from './router'

const App = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}

export default App
