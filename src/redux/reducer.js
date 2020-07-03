import { ADD_SECTION } from './constants'
import { SET_EDITING } from './constants'
import { UPDATE_BLOCK } from './constants'

import deepSearch from '../utils/deepSearch'
var findAnd = require('find-and')

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
            // data: [
            //     {
            //         id: '129r',
            //         type: 'section',
            //         classes: ['flex', 'flex-wrap', 'items-center'],
            //         data: [
            //             {
            //                 id: 'xx82',
            //                 type: 'div',
            //                 classes: ['w-full', 'md:w-1/2'],
            //                 data: [
            //                     {
            //                         id: '1x93',
            //                         type: 'h1',
            //                         classes: [
            //                             'text-4xl',
            //                             'font-bold',
            //                         ],
            //                         data: {
            //                             text: 'Welcome to campfire',
            //                         },
            //                     },
            //                     {
            //                         id: '393x',
            //                         type: 'p',
            //                         classes: ['text-gray-800'],
            //                         data: {
            //                             text:
            //                                 'This is a website builder',
            //                         },
            //                     },
            //                     {
            //                         id: '393z',
            //                         type: 'p',
            //                         classes: ['text-red-800'],
            //                         data: {
            //                             text:
            //                                 'This is a website builder',
            //                         },
            //                     },
            //                 ],
            //             },
            //             {
            //                 id: 'xv82',
            //                 type: 'div',
            //                 classes: ['w-full', 'md:w-1/2'],
            //                 data: [
            //                     {
            //                         id: '39z1',
            //                         type: 'img',
            //                         classes: [],
            //                         data: {
            //                             src:
            //                                 'https://images.unsplash.com/photo-1593059315234-fe82cafe19e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
            //                             alt: 'Example image',
            //                         },
            //                     },
            //                 ],
            //             },
            //         ],
            //     },
            // ],
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
