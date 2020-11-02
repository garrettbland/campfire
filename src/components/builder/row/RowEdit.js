import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { maxWidths, removeMaxWidthClasses } from '../../../utils/width'
import { extractClass } from '../../../utils/tools'
import BorderRadius from '../shared/BorderRadius'
import BoxShadow from '../shared/BoxShadow'
import BackgroundColor from '../shared/BackgroundColor'
import RemoveBlockButton from '../RemoveBlockButton'

const RowEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [maxWidth, setMaxWidth] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentMaxWidth = extractClass(currentlyEditing.classList, ['max-w-', 'container'])

        if (currentMaxWidth) {
            setMaxWidth(currentMaxWidth)
        }
    }, [])

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

    return (
        <div>
            <BackgroundColor />
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
            <BorderRadius />
            <BoxShadow />
            <RemoveBlockButton />
        </div>
    )
}

export default RowEdit
