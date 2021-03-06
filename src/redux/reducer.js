import {
    ADD_SECTION,
    SET_EDITING,
    UPDATE_BLOCK,
    ADD_CONTENT,
    REMOVE_BLOCK,
    SWAP_BLOCKS,
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
        case REMOVE_BLOCK: {
            return {
                ...state,
                website: {
                    ...state.website,
                    body: {
                        ...findAnd.removeObject(state.website.body, {
                            id: action.payload.id,
                        }),
                    },
                },
            }
        }
        case SWAP_BLOCKS: {
            console.log('Start index =>', action.payload.removedIndex)
            console.log('Target index =>', action.payload.addedIndex)

            const array_move = (arr, old_index, new_index) => {
                if (new_index >= arr.length) {
                    var k = new_index - arr.length + 1
                    while (k--) {
                        arr.push(undefined)
                    }
                }
                arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
                return arr // for testing
            }

            return {
                ...state,
                website: {
                    ...state.website,
                    body: {
                        ...state.website.body,
                        data: array_move(
                            state.website.body.data,
                            action.payload.removedIndex,
                            action.payload.addedIndex
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
