import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING, REMOVE_BLOCK } from '../../redux/constants'

const RemoveBlockButton = ({ title = 'Remove Element' }) => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const dispatch = useDispatch()

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
            <button onClick={() => RemoveBlock()}>{title}</button>
        </div>
    )
}

export default RemoveBlockButton
