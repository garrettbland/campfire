import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING, REMOVE_BLOCK } from '../redux/constants'

const LinkEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const dispatch = useDispatch()

    const handleTextChange = (newValue) => {
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: {
                    ...currentlyEditing.data,
                    title: newValue,
                },
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
        <div className="flex flex-col">
            <label>Title</label>
            <input
                value={currentlyEditing.data.title}
                onChange={(event) => handleTextChange(event.target.value)}
                className="border-2 px-4 py-2 rounded"
            />
            <label>Link</label>
            <input
                defaultValue={currentlyEditing.data.href}
                className="border-2 px-4 py-2 rounded"
            />
            <div>
                <button onClick={() => RemoveBlock()}>Remove Link</button>
            </div>
        </div>
    )
}

export default LinkEdit
