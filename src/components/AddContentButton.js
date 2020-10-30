import React from 'react'
import { useDispatch } from 'react-redux'
import { APPEND_CONTENT } from '../redux/constants'

const AddContentButton = ({ block }) => {
    const dispatch = useDispatch()

    const handleAdd = (event) => {
        // will stop any synthetic events from happening after this one
        // example, will not fire edit block
        event.stopPropagation()

        const content_type = window.prompt('What type of content? Text or Image or Link')
        const availableTypes = ['img', 'text', 'link']
        if (availableTypes.includes(content_type)) {
            dispatch({
                type: APPEND_CONTENT,
                payload: {
                    id: block.id,
                    type: content_type,
                },
            })
        } else {
            alert('content type not allowed')
        }
    }

    return <button onClick={(event) => handleAdd(event)}>Add</button>
}

export default AddContentButton
