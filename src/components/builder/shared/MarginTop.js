import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { generateMargins, removeTopMargins } from '../../../utils/margin'
import { extractClass } from '../../../utils/tools'

const MarginTop = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [marginTop, setMarginTop] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentMarginTop = extractClass(currentlyEditing.classList, generateMargins('t'))
        if (currentMarginTop) {
            setMarginTop(currentMarginTop)
        }
    }, [])

    const handleMarginTopUpdate = (index) => {
        setMarginTop(generateMargins('t')[index])

        /**
         * Filter out current max width classes
         */
        const updatedClassList = removeTopMargins(currentlyEditing.classList)

        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                classList: [...updatedClassList, generateMargins('t')[index]],
            },
        })
    }

    return (
        <div>
            {marginTop}
            <input
                type="range"
                min="0"
                max={generateMargins('t').length - 1}
                value={generateMargins('t').findIndex((item) => item === marginTop)}
                onChange={(event) => handleMarginTopUpdate(event.target.value)}
            />
        </div>
    )
}

export default MarginTop
