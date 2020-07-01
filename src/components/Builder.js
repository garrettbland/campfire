import React from 'react'
import buildSite from '../utils/builder'
import { useSelector, useDispatch } from 'react-redux'

const Builder = () => {
    const dispatch = useDispatch()
    const website = useSelector((state) => state.website)

    const addSection = () => {
        dispatch({
            type: 'ADD_SECTION',
            payload: {
                id: 'cc91',
                type: 'section',
                classes: [],
                data: [
                    {
                        id: 'v3z9',
                        type: 'p',
                        data: {
                            text: 'New section paragraph text',
                        },
                    },
                ],
            },
        })
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
