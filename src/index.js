import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './app'
import './style/styles.css'

const rootElement = document.getElementById('app')
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)
