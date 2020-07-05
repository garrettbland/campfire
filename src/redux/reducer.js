import {
    ADD_SECTION,
    SET_EDITING,
    UPDATE_BLOCK,
    ADD_CONTENT,
} from './constants'
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
            tag: 'body',
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
        case ADD_CONTENT: {
            /**
             * Finds the content blocks parent id, and then appends
             * new content block to parent
             */
            let contentObj = findAnd.returnFound(state.website.body, {
                id: action.payload.parentId,
            })
            contentObj.data = [
                ...contentObj.data,
                { ...action.payload },
            ]

            return {
                ...state,
                website: {
                    ...state.website,
                    body: {
                        ...findAnd.changeProps(
                            state.website.body,
                            {
                                parentId: action.payload.parentId,
                            },
                            {
                                contentObj,
                            }
                        ),
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
