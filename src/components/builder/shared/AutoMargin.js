import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { extractClass } from '../../../utils/tools'
import { autoMargins, removeAutoMargins } from '../../../utils/margin'

const AutoMargin = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [autoMargin, setAutoMargin] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentAutoMargin = extractClass(currentlyEditing.classList, autoMargins())
        if (currentAutoMargin) {
            setAutoMargin(currentAutoMargin)
        }
    }, [currentlyEditing.id])

    const handleAutoMarginUpdate = (value) => {
        setAutoMargin(value)
        const updatedClassList = removeAutoMargins(currentlyEditing.classList)
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
            {autoMargin ? autoMargin : 'Default'}
            <div>
                <button
                    className={`${autoMargin === 'mr-auto' ? 'text-blue-500' : null}`}
                    onClick={() => handleAutoMarginUpdate('mr-auto')}
                >
                    Left
                </button>
                <button
                    className={`${autoMargin === 'mx-auto' ? 'text-blue-500' : null}`}
                    onClick={() => handleAutoMarginUpdate('mx-auto')}
                >
                    Center
                </button>
                <button
                    className={`${autoMargin === 'ml-auto' ? 'text-blue-500' : null}`}
                    onClick={() => handleAutoMarginUpdate('ml-auto')}
                >
                    Right
                </button>
            </div>
        </div>
    )
}

export default AutoMargin
