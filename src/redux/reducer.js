import { ADD_SECTION } from './constants'
import { SET_EDITING } from './constants'
import { UPDATE_BLOCK } from './constants'
const findAnd = require('find-and')

/**
 * Define initial state for campfire app
 */
let initialState = {
    currentlyEditing: {},
    website: {
        head: {
            title: 'Campfire site',
            description: 'This is a website',
            scripts: ['google gtag analytics', 'google fonts'],
        },
        body: {
            id: 'body',
            type: 'body',
            classes: ['bg-gray-100'],
            data: [],
        },
    },
}

/**
 * Reducer for app to manage global state
 */
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SECTION: {
            return {
                ...state,
                website: {
                    ...state.website,
                    body: {
                        ...state.website.body,
                        data: [
                            ...state.website.body.data,
                            { ...action.payload },
                        ],
                    },
                },
            }
        }
        case SET_EDITING: {
            return {
                ...state,
                currentlyEditing: action.payload,
            }
        }
        case UPDATE_BLOCK: {
            console.log(action.payload)
            return {
                ...state,
                website: {
                    ...state.website,
                    body: {
                        ...findAnd.changeProps(
                            state.website.body,
                            {
                                id: action.payload.id,
                            },
                            {
                                ...action.payload,
                            }
                        ),
                    },
                },
            }
        }
        default:
            return state
    }
}

export default rootReducer
