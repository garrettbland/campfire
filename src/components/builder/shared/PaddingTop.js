import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { generatePadding, removeTopPadding } from '../../../utils/padding'
import { extractClass } from '../../../utils/tools'

const PaddingTop = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [paddingTop, setPaddingTop] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentPaddingTop = extractClass(currentlyEditing.classList, generatePadding('t'))
        if (currentPaddingTop) {
            setPaddingTop(currentPaddingTop)
        }
    }, [])

    const handlePaddingTopUpdate = (index) => {
        setPaddingTop(generatePadding('t')[index])

        /**
         * Filter out current max width classes
         */
        const updatedClassList = removeTopPadding(currentlyEditing.classList)

        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                classList: [...updatedClassList, generatePadding('t')[index]],
            },
        })
    }

    return (
        <div>
            {paddingTop}
            <input
                type="range"
                min="0"
                max={generatePadding('t').length - 1}
                value={generatePadding('t').findIndex((item) => item === paddingTop)}
                onChange={(event) => handlePaddingTopUpdate(event.target.value)}
            />
        </div>
    )
}

export default PaddingTop
