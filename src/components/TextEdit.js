import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING, REMOVE_BLOCK } from '../redux/constants'
import { ReactTrixRTEInput } from 'react-trix-rte'

const TextEdit = () => {
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

    const RemoveBlock = () => {
        dispatch({
            type: REMOVE_BLOCK,
            payload: currentlyEditing,
        })

        dispatch({
            type: UPDATE_EDITING,
        })
    }

    return (
        <div>
            <ReactTrixRTEInput defaultValue={currentlyEditing.data} onChange={handleTextChange} />
            <div>
                <button onClick={() => RemoveBlock()}>Remove Text</button>
            </div>
        </div>
    )
}

export default TextEdit
