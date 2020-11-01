import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING, REMOVE_BLOCK } from '../redux/constants'
import { generateColors, removeBackgroundClasses } from '../utils/colors'
import { extractClass } from '../utils/tools'
import RemoveBlockButton from './RemoveBlockButton'

const SectionEdit = () => {
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

    const RemoveSection = () => {
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
            <div>Background Color: {bgColor ? bgColor : 'N/A'}</div>
            <div className="flex flex-wrap">
                {[...generateColors('bg'), ''].map((color) => {
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
            <RemoveBlockButton />
        </div>
    )
}

export default SectionEdit
