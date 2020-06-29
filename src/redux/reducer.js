import { INCREMENT, DECREMENT } from './constants'

/**
 * Define initial state for campfire app
 */
let initialState = {
    count: 0,
}

/**
 * Reducer for app to manage global state
 */
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1,
            }
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            }
        default:
            return state
    }
}

export default rootReducer
