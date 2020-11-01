import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING, REMOVE_BLOCK } from '../redux/constants'
import LineHeight from './LineHeight'
import FontSize from './FontSize'
import TextAlignment from './TextAlignment'
import TextColor from './TextColor'
import TextContent from './TextContent'

const TextEdit = () => {
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
            <TextContent />
            {/* <ReactTrixRTEInput defaultValue={currentlyEditing.data} onChange={handleTextChange} /> */}
            <div>
                <button onClick={() => RemoveBlock()}>Remove Text</button>
            </div>
            <TextColor />
            <TextAlignment />
            <FontSize />
            <LineHeight />
        </div>
    )
}

export default TextEdit
