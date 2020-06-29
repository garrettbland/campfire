import { INCREMENT, DECREMENT } from './constants'

/**
 * Define initial state for campfire app
 */
let initialState = {
    website: {
        head: {
            title: 'Campfire site',
            description: 'This is a website',
            scripts: ['google gtag analytics', 'google fonts'],
        },
        data: [
            {
                id: '39xs',
                type: 'body',
                classes: ['bg-gray-100'],
                data: [
                    {
                        id: '129r',
                        type: 'div',
                        classes: [
                            'flex',
                            'flex-wrap',
                            'items-center',
                        ],
                        data: [
                            {
                                id: 'xx82',
                                type: 'div',
                                classes: ['w-full', 'md:w-1/2'],
                                data: [
                                    {
                                        id: '1x93',
                                        type: 'h1',
                                        classes: [
                                            'text-4xl',
                                            'font-bold',
                                        ],
                                        data: {
                                            text:
                                                'Welcome to campfire',
                                        },
                                    },
                                    {
                                        id: '393x',
                                        type: 'p',
                                        classes: ['text-gray-800'],
                                        data: {
                                            text:
                                                'This is a website builder',
                                        },
                                    },
                                ],
                            },
                            {
                                id: 'xv82',
                                type: 'div',
                                classes: ['w-full', 'md:w-1/2'],
                                data: [
                                    {
                                        id: '39z1',
                                        type: 'img',
                                        classes: [],
                                        data: {
                                            src:
                                                'https://images.unsplash.com/photo-1593059315234-fe82cafe19e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
                                            alt: 'Example image',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
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
