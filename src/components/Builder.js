import React, { useState } from 'react'
import BuildSite from '../utils/builder'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

const Builder = () => {
    const dispatch = useDispatch()
    const website = useSelector((state) => state.website)
    const currentlyEditing = useSelector(
        (state) => state.currentlyEditing
    )

    const addSection = () => {
        /**
         * ask user for columns
         */
        const columns = prompt('how many columns')

        /**
         * range of columns (currently max of 6 with tailwind)
         */
        const column_range = ['1', '2', '3', '4', '5', '6']

        if (column_range.includes(columns)) {
            dispatch({
                type: 'ADD_SECTION',
                payload: {
                    id: uuidv4(),
                    type: 'section',
                    classes: ['py-12', 'bg-gray-200'],
                    data: [
                        {
                            id: uuidv4(),
                            type: 'container',
                            classes: [
                                `container`,
                                `mx-auto`,
                                `grid`,
                                `grid-cols-1`,
                                `md:grid-cols-${columns}`,
                                `gap-4`,
                                `px-4`,
                            ],
                            data: [...Array(parseInt(columns))].map(
                                (col, index) => {
                                    return {
                                        id: uuidv4(),
                                        type: 'content-container',
                                        classes: [
                                            'grid',
                                            'gap-4',
                                            'content-start',
                                        ],
                                        data: [],
                                    }
                                }
                            ),
                        },
                    ],
                },
            })
        } else {
            alert('Allowed columns are 1 - 6')
        }
    }

    const addContent = (parentId) => {
        const contentType = prompt(
            'What kind of content "text or img"'
        )

        if (contentType === 'text') {
            dispatch({
                type: 'ADD_CONTENT',
                payload: {
                    id: uuidv4(),
                    parentId: parentId,
                    type: 'text',
                    classes: [],
                    data: {
                        tag: 'p',
                        text:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    },
                },
            })
        } else if (contentType === 'img') {
            dispatch({
                type: 'ADD_CONTENT',
                payload: {
                    id: uuidv4(),
                    parentId: parentId,
                    type: 'image',
                    classes: [],
                    data: {
                        tag: 'img',
                        src:
                            'https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                        alt: '',
                    },
                },
            })
        } else {
            alert('must be text or img')
        }
    }

    const handleChange = ({ target }) => {
        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                data: {
                    text: target.value,
                },
            },
        })
    }

    const updateBlock = () => {
        dispatch({
            type: 'UPDATE_BLOCK',
            payload: {
                ...currentlyEditing,
            },
        })
    }

    const addTextColor = (name) => {
        /**
         * Create clone of classes array
         */
        const { classes } = currentlyEditing

        /**
         * Color Library
         */
        const textClasses = [
            'text-green-500',
            'text-red-500',
            'text-teal-500',
        ]

        /**
         * Filter and remove all text color classes
         */
        const updatedClasses = classes.filter((item) => {
            return !textClasses.includes(item)
        })

        return updatedClasses.concat(name)
    }

    const addClassToBlock = (newClass) => {
        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                classes: addTextColor(newClass.name),
            },
        })
    }

    return (
        <div>
            <BuildSite
                data={website.body.data}
                addContent={addContent}
            />
            <div className="flex justify-center py-6">
                <button
                    className="bg-blue-700 text-sm px-4 py-1 hover:bg-blue-600 rounded text-blue-100"
                    onClick={() => addSection()}
                >
                    Add Section
                </button>
            </div>
            {/* <div>
                <p>Currently editing</p>
                <p>{JSON.stringify(currentlyEditing, null, 2)}</p>
            </div>
            <div className="overflow-hidden">
                <pre>{JSON.stringify(website, null, 2)}</pre>
            </div> */}
        </div>
    )
}

export default Builder
