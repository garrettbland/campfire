import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import Router from './router'

const App = () => <Router />

ReactDOM.render(<App />, document.querySelector('#root'))
