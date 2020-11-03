import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { extractClass } from '../../../utils/tools'
import { generateColors, removeTextColors } from '../../../utils/colors'
import ColorPicker from '../shared/ColorPicker'

const TextColor = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [textColor, setTextColor] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentTextColor = extractClass(currentlyEditing.classList, generateColors('text'))
        if (currentTextColor) {
            setTextColor(currentTextColor)
        }
    }, [currentlyEditing.id])

    const handleTextColorUpdate = (value) => {
        setTextColor(value)
        const updatedClassList = removeTextColors(currentlyEditing.classList)
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                classList: [...updatedClassList, value],
            },
        })
    }

    return (
        <div>
            <div>Text Color: {textColor ? textColor : 'N/A'}</div>
            <ColorPicker
                currentColor={textColor.replace('text-', '')}
                onClick={(color) => handleTextColorUpdate(`text-${color}`)}
            />
        </div>
    )
}

export default TextColor
