import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TextEdit = () => {
    const dispatch = useDispatch()
    const currentlyEditing = useSelector(
        (state) => state.currentlyEditing
    )

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

    return (
        <div className="overflow-y-scroll">
            <p>Text</p>
            <input
                className="bg-gray-300 p-1 border border-gray-500 mb-6"
                value={currentlyEditing.data.text}
                onChange={(event) => handleChange(event)}
            />
        </div>
    )
}

export default TextEdit
