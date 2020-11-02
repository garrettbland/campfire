import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { generateColors, removeBackgroundColors } from '../../../utils/colors'
import { extractClass } from '../../../utils/tools'

const BackgroundColor = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [bgColor, setBgColor] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentBgColor = extractClass(currentlyEditing.classList, 'bg-')
        if (currentBgColor) {
            setBgColor(currentBgColor)
        }
    }, [currentlyEditing.id])

    const handleBackgroundColorUpdate = (value) => {
        setBgColor(value)
        const updatedClassList = removeBackgroundColors(currentlyEditing.classList)
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
            <div>Background Color: {bgColor ? bgColor : 'Default'}</div>
            <div className="flex flex-wrap">
                {[...generateColors('bg'), ''].map((color) => {
                    return (
                        <div
                            key={color}
                            onClick={() => handleBackgroundColorUpdate(color)}
                            className={`w-8 h-8 ${
                                color ? color : 'bg-teal-500'
                            } border cursor-pointer`}
                        >
                            {color === bgColor ? 'Selected' : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BackgroundColor
