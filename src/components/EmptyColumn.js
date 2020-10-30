import React from 'react'
import { useDispatch } from 'react-redux'
import { ADD_CONTENT } from '../redux/constants'

const EmptyColumn = ({ data: block }) => {
    const dispatch = useDispatch()

    const AddContent = () => {
        const content_type = window.prompt('What type of content? Text or Image')
        const availableTypes = ['img', 'text', 'link']
        if (availableTypes.includes(content_type)) {
            dispatch({
                type: ADD_CONTENT,
                payload: {
                    id: block.id,
                    type: content_type,
                },
            })
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
