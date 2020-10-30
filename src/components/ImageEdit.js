import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING, REMOVE_BLOCK } from '../redux/constants'

const ImageEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const dispatch = useDispatch()

    const handleTextChange = (newValue) => {
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: {
                    ...currentlyEditing.data,
                    src: newValue,
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
        <div>
            <img className="w-64 h-auto" src={currentlyEditing.data.src} />
            Alt Text:{' '}
            <input
                defaultValue={currentlyEditing.data.alt}
                className="border-2 px-4 py-2 rounded"
            />
            <div>
                <label>Photo URL</label>
                <input
                    value={currentlyEditing.data.src}
                    onChange={(event) => handleTextChange(event.target.value)}
                    className="border-2 px-4 py-2 rounded"
                />
            </div>
            <div>
                <button onClick={() => RemoveBlock()}>Remove Image</button>
            </div>
        </div>
    )
}

export default ImageEdit
