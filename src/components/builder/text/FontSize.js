import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { extractClass } from '../../../utils/tools'
import { fontSizes, removeFontSizes } from '../../../utils/text'

const FontSize = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [fontSize, setFontSize] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentFontSize = extractClass(currentlyEditing.classList, fontSizes())
        if (currentFontSize) {
            setFontSize(currentFontSize)
        }
    }, [currentlyEditing.id])

    const handleFontSizeUpdate = (index) => {
        setFontSize(fontSizes()[index])
        const updatedClassList = removeFontSizes(currentlyEditing.classList)
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                classList: [...updatedClassList, fontSizes()[index]],
            },
        })
    }

    return (
        <div>
            {fontSize}
            <input
                type="range"
                min="0"
                max={fontSizes().length - 1}
                value={fontSizes().findIndex((item) => item === fontSize)}
                onChange={(event) => handleFontSizeUpdate(event.target.value)}
            />
        </div>
    )
}

export default FontSize
