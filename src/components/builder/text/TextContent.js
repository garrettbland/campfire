import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { ReactTrixRTEInput } from 'react-trix-rte'

const TextContent = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const dispatch = useDispatch()

    const handleTextChange = (event, newValue) => {
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: newValue,
            },
        })
    }

    return (
        <div>
            <ReactTrixRTEInput defaultValue={currentlyEditing.data} onChange={handleTextChange} />
        </div>
    )
}

export default TextContent
