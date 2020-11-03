import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'

const BackgroundImage = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const dispatch = useDispatch()

    useEffect(() => {}, [currentlyEditing.id])

    return (
        <div>
            <div>Background Photo URL</div>
            <input
                value={currentlyEditing.data.src}
                onChange={(event) => handleTextChange(event.target.value)}
                className="border-2 px-4 py-2 rounded"
            />
        </div>
    )
}

export default BackgroundImage
