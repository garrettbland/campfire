import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { generatePadding, removeBottomPadding } from '../../../utils/padding'
import { extractClass } from '../../../utils/tools'

const PaddingBottom = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [paddingBottom, setPaddingBottom] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentPaddingBottom = extractClass(currentlyEditing.classList, generatePadding('b'))
        if (currentPaddingBottom) {
            setPaddingBottom(currentPaddingBottom)
        }
    }, [])

    const handlePaddingBottomUpdate = (index) => {
        setPaddingBottom(generatePadding('b')[index])

        /**
         * Filter out current max width classes
         */
        const updatedClassList = removeBottomPadding(currentlyEditing.classList)

        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                classList: [...updatedClassList, generatePadding('b')[index]],
            },
        })
    }

    return (
        <div>
            {paddingBottom}
            <input
                type="range"
                min="0"
                max={generatePadding('b').length - 1}
                value={generatePadding('b').findIndex((item) => item === paddingBottom)}
                onChange={(event) => handlePaddingBottomUpdate(event.target.value)}
            />
        </div>
    )
}

export default PaddingBottom
