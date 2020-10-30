import {
    UPDATE_BLOCK,
    SET_EDITING,
    UPDATE_EDITING,
    ADD_SECTION,
    ADD_ROW,
    APPEND_ROW,
    REMOVE_BLOCK,
    SWAP_BLOCKS,
    ADD_TEXT,
    ADD_IMAGE,
    ADD_LINK,
} from './constants'
const findAnd = require('find-and')
import { v4 as uuidv4 } from 'uuid'

/**
 * Define initial state for app
 */
/**
 * Blocks array describing website
 * Still expirimenting with how I want blocks
 * to be setup.
 */
let initialState = {
    currentlyEditing: null,
    blocks: [
        {
            id: uuidv4(),
            type: 'section',
            tag: 'section',
            classList: ['py-12', 'relative'],
            data: [],
        },
        {
            id: uuidv4(),
            type: 'section',
            tag: 'section',
            classList: ['py-12', 'relative'],
            data: [
                {
                    id: uuidv4(),
                    type: 'row',
                    tag: 'div',
                    classList: ['container', 'mx-auto', 'bg-blue-500', 'flex', 'flex-wrap', 'py-6'],
                    data: [
                        {
                            id: uuidv4(),
                            type: 'column',
                            tag: 'div',
                            classList: ['w-full', 'md:w-1/2', 'p-4'],
                            data: [
                                {
                                    id: uuidv4(),
                                    type: 'text',
                                    tag: 'p',
                                    classList: [
                                        'text-black',
                                        'text-4xl',
                                        'font-semibold',
                                        'leading-10',
                                        'mb-2',
                                    ],
                                    data: 'This is a website editor made with react + tailwind',
                                },
                                {
                                    id: uuidv4(),
                                    type: 'text',
                                    tag: 'p',
                                    classList: ['text-gray-800', 'text-md', 'leading-6', 'mb-4'],
                                    data:
                                        'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century',
                                },
                                {
                                    id: uuidv4(),
                                    type: 'link',
                                    tag: 'a',
                                    classList: [
                                        'px-4',
                                        'py-2',
                                        'bg-green-500',
                                        'text-white',
                                        'rounded',
                                        'inline-block',
                                    ],
                                    data: {
                                        target: '_self',
                                        href: '#',
                                        title: 'Try Today',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            type: 'column',
                            tag: 'div',
                            classList: ['w-full', 'md:w-1/2', 'p-4'],
                            data: [
                                {
                                    id: uuidv4(),
                                    type: 'image',
                                    tag: 'img',
                                    classList: [
                                        'text-black',
                                        'text-3xl',
                                        'text-center',
                                        'bg-orange-800',
                                    ],
                                    data: {
                                        src:
                                            'https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                                        alt: 'Highway Photo',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: uuidv4(),
            type: 'section',
            tag: 'section',
            classList: ['py-12', 'relative', 'bg-orange-500'],
            data: [
                {
                    id: uuidv4(),
                    type: 'row',
                    tag: 'div',
                    classList: ['max-w-4xl', 'mx-auto', 'bg-blue-500', 'flex', 'flex-wrap', 'py-6'],
                    data: [
                        {
                            id: uuidv4(),
                            type: 'column',
                            tag: 'div',
                            classList: ['w-full', 'md:w-1/3', 'p-4'],
                            data: [
                                {
                                    id: uuidv4(),
                                    type: 'image',
                                    tag: 'img',
                                    classList: [],
                                    data: {
                                        alt: 'image',
                                        src:
                                            'https://images.unsplash.com/photo-1503945839639-aea48daa250f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            type: 'column',
                            tag: 'div',
                            classList: ['w-full', 'md:w-1/3', 'p-4'],
                            data: [
                                {
                                    id: uuidv4(),
                                    type: 'image',
                                    tag: 'img',
                                    classList: [],
                                    data: {
                                        alt: 'image',
                                        src:
                                            'https://images.unsplash.com/photo-1505739679850-7adc7776516b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80',
                                    },
                                },
                            ],
                        },
                        {
                            id: uuidv4(),
                            type: 'column',
                            tag: 'div',
                            classList: ['w-full', 'md:w-1/3', 'p-4'],
                            data: [
                                {
                                    id: uuidv4(),
                                    type: 'image',
                                    tag: 'img',
                                    classList: [],
                                    data: {
                                        alt: 'image',
                                        src:
                                            'https://images.unsplash.com/photo-1508176850193-21de4476f385?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}

/**
 * Reducer for app to manage global state
 */
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EDITING: {
            return {
                ...state,
                currentlyEditing: action.payload ? action.payload : null,
            }
        }
        case UPDATE_BLOCK: {
            /**
             * Need to update this for classList and stuff other than 'data' key
             */
            return {
                ...state,
                blocks: findAnd.changeProps(
                    state.blocks,
                    { id: action.payload.id },
                    { ...action.payload }
                ),
            }
        }
        case UPDATE_EDITING: {
            return {
                ...state,
                currentlyEditing: action.payload,
            }
        }
        case ADD_SECTION: {
            /**
             * If not payload is supplied, add the new section to the parent blocks array
             */
            if (!action.payload) {
                return {
                    ...state,
                    blocks: [
                        ...state.blocks,
                        {
                            id: uuidv4(),
                            type: 'section',
                            tag: 'section',
                            classList: ['py-12', 'relative'],
                            data: [],
                        },
                    ],
                }
            }

            return {
                ...state,
                blocks: findAnd.insertObjectAfter(
                    state.blocks,
                    { id: action.payload.id },
                    {
                        id: uuidv4(),
                        type: 'section',
                        tag: 'section',
                        classList: ['py-12', 'relative'],
                        data: [],
                    }
                ),
            }
        }
        case ADD_ROW: {
            /**
             * Find the parent section
             */
            const currentSection = findAnd.returnFound(state.blocks, { id: action.payload.id })

            const empty_row = {
                id: uuidv4(),
                type: 'row',
                tag: 'div',
                classList: ['max-w-4xl', 'mx-auto', 'flex', 'flex-wrap', 'py-6'],
                data: [...Array(action.payload.columns)].map((index) => {
                    return {
                        id: uuidv4(),
                        type: `column`,
                        tag: `div`,
                        classList: [
                            `w-full`,
                            `${
                                action.payload.columns === 1
                                    ? 'md:w-full'
                                    : `md:w-1/${action.payload.columns}`
                            }`,
                            `p-4`,
                        ],
                        data: [],
                    }
                }),
            }

            return {
                ...state,
                blocks: findAnd.changeProps(
                    state.blocks,
                    { id: action.payload.id },
                    {
                        data: [...currentSection.data, empty_row],
                    }
                ),
            }
        }
        case APPEND_ROW: {
            const empty_row = {
                id: uuidv4(),
                type: 'row',
                tag: 'div',
                classList: ['max-w-4xl', 'mx-auto', 'flex', 'flex-wrap', 'py-6'],
                data: [...Array(action.payload.columns)].map((index) => {
                    return {
                        id: uuidv4(),
                        type: `column`,
                        tag: `div`,
                        classList: [
                            `w-full`,
                            `${
                                action.payload.columns === 1
                                    ? 'md:w-full'
                                    : `md:w-1/${action.payload.columns}`
                            }`,
                            `p-4`,
                        ],
                        data: [],
                    }
                }),
            }

            return {
                ...state,
                blocks: findAnd.insertObjectAfter(
                    state.blocks,
                    { id: action.payload.id },
                    empty_row
                ),
            }
        }
        case REMOVE_BLOCK: {
            return {
                ...state,
                blocks: findAnd.removeObject(state.blocks, { id: action.payload.id }),
            }
        }
        case SWAP_BLOCKS: {
            const array_move = (arr, old_index, new_index) => {
                if (new_index >= arr.length) {
                    var k = new_index - arr.length + 1
                    while (k--) {
                        arr.push(undefined)
                    }
                }
                arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
                return arr
            }

            const updated_blocks_order = array_move(
                state.blocks,
                action.payload.removedIndex,
                action.payload.addedIndex
            )

            return {
                ...state,
                blocks: [...updated_blocks_order],
            }
        }
        case ADD_TEXT: {
            /**
             * Find the parent section
             */
            const currentColumn = findAnd.returnFound(state.blocks, { id: action.payload.id })

            const default_text = {
                id: uuidv4(),
                type: 'text',
                tag: 'p',
                classList: ['text-black', 'text-md', 'leading-6'],
                data:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            }

            return {
                ...state,
                blocks: findAnd.changeProps(
                    state.blocks,
                    { id: action.payload.id },
                    {
                        data: [...currentColumn.data, default_text],
                    }
                ),
            }
        }
        case ADD_IMAGE: {
            /**
             * Find the parent section
             */
            const currentColumn = findAnd.returnFound(state.blocks, { id: action.payload.id })

            const default_image = {
                id: uuidv4(),
                type: 'image',
                tag: 'img',
                classList: ['w-full'],
                data: {
                    src:
                        'https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                    alt: 'Highway Photo',
                },
            }

            return {
                ...state,
                blocks: findAnd.changeProps(
                    state.blocks,
                    { id: action.payload.id },
                    {
                        data: [...currentColumn.data, default_image],
                    }
                ),
            }
        }
        case ADD_LINK: {
            /**
             * Find the parent section
             */
            const currentColumn = findAnd.returnFound(state.blocks, { id: action.payload.id })

            const default_link = {
                id: uuidv4(),
                type: 'link',
                tag: 'a',
                classList: [
                    'px-4',
                    'py-2',
                    'bg-green-500',
                    'text-white',
                    'rounded',
                    'inline-block',
                ],
                data: {
                    target: '_self',
                    href: '#',
                    title: 'Try Today',
                },
            }

            return {
                ...state,
                blocks: findAnd.changeProps(
                    state.blocks,
                    { id: action.payload.id },
                    {
                        data: [...currentColumn.data, default_link],
                    }
                ),
            }
        }
        default:
            return state
    }
}

export default rootReducer
