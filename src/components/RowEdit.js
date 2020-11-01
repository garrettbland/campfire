import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING, REMOVE_BLOCK } from '../redux/constants'
import { generateColors, removeBackgroundClasses } from '../utils/colors'
import { maxWidths, removeMaxWidthClasses } from '../utils/width'
import { extractClass } from '../utils/tools'
import RemoveBlockButton from './RemoveBlockButton'

const RowEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [bgColor, setBgColor] = useState('')
    const [maxWidth, setMaxWidth] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentBgColor = extractClass(currentlyEditing.classList, 'bg-')
        const currentMaxWidth = extractClass(currentlyEditing.classList, ['max-w-', 'container'])

        if (currentBgColor) {
            setBgColor(currentBgColor)
        }

        if (currentMaxWidth) {
            setMaxWidth(currentMaxWidth)
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

    const handleMaxWidthUpdate = (index) => {
        setMaxWidth(maxWidths()[index])

        /**
         * Filter out current max width classes
         */
        const updatedClassList = removeMaxWidthClasses(currentlyEditing.classList)

        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                classList: [...updatedClassList, maxWidths()[index]],
            },
        })
    }

    const RemoveRow = () => {
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
            <div>
                {maxWidth}
                <input
                    type="range"
                    min="0"
                    max={maxWidths().length - 1}
                    value={maxWidths().findIndex((item) => item === maxWidth)}
                    onChange={(event) => handleMaxWidthUpdate(event.target.value)}
                />
            </div>
            <RemoveBlockButton />
        </div>
    )
}

export default RowEdit
