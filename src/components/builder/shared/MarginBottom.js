import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { generateMargins, removeBottomMargins } from '../../../utils/margin'
import { extractClass } from '../../../utils/tools'

const MarginBottom = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [marginBottom, setMarginBottom] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentMarginBottom = extractClass(currentlyEditing.classList, generateMargins('b'))
        if (currentMarginBottom) {
            setMarginBottom(currentMarginBottom)
        }
    }, [])

    const handleMarginBottomUpdate = (index) => {
        setMarginBottom(generateMargins('b')[index])

        /**
         * Filter out current max width classes
         */
        const updatedClassList = removeBottomMargins(currentlyEditing.classList)

        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                classList: [...updatedClassList, generateMargins('b')[index]],
            },
        })
    }

    return (
        <div>
            {marginBottom}
            <input
                type="range"
                min="0"
                max={generateMargins('b').length - 1}
                value={generateMargins('b').findIndex((item) => item === marginBottom)}
                onChange={(event) => handleMarginBottomUpdate(event.target.value)}
            />
        </div>
    )
}

export default MarginBottom
