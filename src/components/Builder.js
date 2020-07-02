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
                            type: 'div',
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
                                        type: 'div',
                                        classes: [
                                            'w-full',
                                            `md:w-1/${columns}`,
                                            'p-8',
                                            'bg-pink-400',
                                        ],
                                        data: [
                                            {
                                                id: uuidv4(),
                                                type: 'p',
                                                classes: [
                                                    'opacity-75',
                                                ],
                                                data: {
                                                    text: `Column ${index}`,
                                                },
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
                classes: ['text-3xl'],
            },
        })
    }

    return (
        <div>
            <BuildSite data={website?.body?.data} />
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
                        <button onClick={() => updateBlock()}>
                            Update
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Builder
