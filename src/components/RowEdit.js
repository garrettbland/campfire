import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../redux/constants'
import { backgroundColors, removeBackgroundClasses } from '../utils/colors'
import { extractClass } from '../utils/tools'

const RowEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [bgColor, setBgColor] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentBgColor = extractClass(currentlyEditing.classList, 'bg-')
        if (currentBgColor) {
            setBgColor(currentBgColor)
        }
    }, [])

    const handleUpdate = (value) => {
        setBgColor(value)

        /**
         * Filter out any background classes
         */
        const updatedClassList = removeBackgroundClasses(currentlyEditing.classList)

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
            <div>Background Color: {bgColor ? bgColor : 'N/A'}</div>
            <div className="flex flex-wrap">
                {[...backgroundColors(), ''].map((color) => {
                    return (
                        <div
                            key={color}
                            onClick={() => handleUpdate(color)}
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

export default RowEdit
