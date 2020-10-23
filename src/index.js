import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Router from './router'
import './style/styles.css'

const rootElement = document.getElementById('app')
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    rootElement
)
