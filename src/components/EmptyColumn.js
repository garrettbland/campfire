import React from 'react'
import { useDispatch } from 'react-redux'
import { ADD_TEXT, ADD_IMAGE } from '../redux/constants'

const EmptyColumn = ({ data: block }) => {
    const dispatch = useDispatch()

    const AddContent = () => {
        const content_type = window.prompt('What type of content? Text or Image')
        const availableTypes = ['img', 'text']
        if (availableTypes.includes(content_type)) {
            if (content_type === 'text') {
                dispatch({
                    type: ADD_TEXT,
                    payload: {
                        id: block.id,
                    },
                })
            }

            if (content_type === 'img') {
                dispatch({
                    type: ADD_IMAGE,
                    payload: {
                        id: block.id,
                    },
                })
            }
        } else {
            alert('content type not allowed')
        }
    }

    return (
        <div className="flex justify-center items-center">
            <button
                onClick={() => AddContent()}
                className="w-24 h-10 bg-purple-600 opacity-50 hover:opacity-100 rounded-full"
            >
                + Content
            </button>
        </div>
    )
}

export default EmptyColumn
