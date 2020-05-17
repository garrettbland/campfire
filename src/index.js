import dataObject from './data'
import { createStore } from 'redux'
import textElementListener from './components/textElementListener'

let initialState = {
    name: 'Garrett',
    age: 26,
    count: 0,
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1,
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1,
            }
        default:
            return state
    }
}

let store = createStore(rootReducer)

store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })

/**
 * Base alpine function for x-data
 */
const campfire = () => {
    return {
        state: store.getState(),
        init: function () {
            console.log('🔥 campfire has initialized...')

            /**
             * Subscribe to redux store and update state when store changes
             */
            store.subscribe(() => {
                this.state = store.getState()
            })

            /**
             * Start listening for hover and mouseover events
             */
            textElementListener()
        },
        increment: () => {
            console.log('increment...')
            store.dispatch({ type: 'INCREMENT' })
        },
    }
}

/**
 * Attach campfire function to global window object to use alpine
 */
window.campfire = campfire
