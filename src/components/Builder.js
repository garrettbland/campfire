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
                    classes: ['p-8', 'bg-green-400'],
                    data: [
                        {
                            id: uuidv4(),
                            type: 'container',
                            classes: [
                                'container',
                                'mx-auto',
                                'flex',
                                'flex-wrap',
                                'p-8',
                                'bg-red-400',
                            ],
                            data: [...Array(parseInt(columns))].map(
                                (col, index) => {
                                    return {
                                        id: uuidv4(),
                                        type: 'content-container',
                                        classes: [
                                            'w-full',
                                            `md:w-1/${columns}`,
                                            'p-8',
                                            'bg-pink-400',
                                        ],
                                        data: [
                                            {
                                                id: uuidv4(),
                                                type: 'empty-content',
                                                classes: [],
                                                data: [],
                                            },
                                        ],
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

    const addContent = (id) => {
        dispatch({
            type: 'UPDATE_BLOCK',
            payload: {
                id: id,
                type: 'p',
                data: {
                    text: 'A new text block!',
                },
            },
        })
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

    const addClassToBlock = () => {
        const newClass = 'text-teal-500'
        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                classes: [...currentlyEditing.classes, newClass],
            },
        })
    }

    return (
        <div>
            <BuildSite
                data={website.body.data}
                addContent={addContent}
            />
            <div>
                <button onClick={() => addSection()}>
                    Add Section
                </button>
            </div>
            <div>
                <p>Currently editing</p>
                <p>{JSON.stringify(currentlyEditing, null, 2)}</p>
                {currentlyEditing.data && (
                    <>
                        <input
                            className="bg-gray-300 p-1 border border-gray-500"
                            value={currentlyEditing.data.text}
                            onChange={(event) => handleChange(event)}
                        />
                        <div>
                            {currentlyEditing.classes.length > 0 && (
                                <div>
                                    {currentlyEditing.classes.map(
                                        (item) => (
                                            <div>{item}</div>
                                        )
                                    )}
                                </div>
                            )}
                            {currentlyEditing?.classes && (
                                <div>
                                    <button onClick={addClassToBlock}>
                                        Add Teal Color
                                    </button>
                                </div>
                            )}
                        </div>
                        <button onClick={() => updateBlock()}>
                            Update
                        </button>
                    </>
                )}
            </div>
            <div>
                <pre>{JSON.stringify(website, null, 2)}</pre>
            </div>
        </div>
    )
}

export default Builder
