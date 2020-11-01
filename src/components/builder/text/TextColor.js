import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { extractClass } from '../../../utils/tools'
import { generateColors, removeTextColorClasses } from '../../../utils/colors'

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

        /**
         * Filter out any text color classes
         */
        const updatedClassList = removeTextColorClasses(currentlyEditing.classList)

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
            <div className="flex flex-wrap">
                {[...generateColors('text'), ''].map((color) => {
                    return (
                        <div
                            key={color}
                            onClick={() => handleTextColorUpdate(color)}
                            className={`w-8 h-8 ${
                                color ? color.replace('text-', 'bg-') : 'bg-teal-500'
                            } border cursor-pointer`}
                        >
                            {color === textColor ? 'Selected' : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TextColor
