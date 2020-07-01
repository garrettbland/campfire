import React from 'react'
import buildSite from '../utils/builder'
import { useSelector, useDispatch } from 'react-redux'

const Builder = () => {
    const dispatch = useDispatch()
    const website = useSelector((state) => state.website)

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
                    type: 'section',
                    classes: ['p-8', 'bg-red-100'],
                    data: [
                        {
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
                                        type: 'div',
                                        classes: [
                                            'w-full',
                                            `md:w-1/${columns}`,
                                            'p-4',
                                            'bg-red-700',
                                        ],
                                        data: [
                                            {
                                                type: 'p',
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

    return (
        <div>
            <div>{buildSite(website?.body?.data)}</div>
            <div>
                <button onClick={() => addSection()}>
                    Add Section
                </button>
            </div>
        </div>
    )
}

export default Builder
