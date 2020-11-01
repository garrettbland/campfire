import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../redux/constants'
import { extractClass } from '../utils/tools'
import { textAlignments, removeTextAlignments } from '../utils/text'

const TextAlignment = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [textAlignment, setTextAlignment] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentTextAlignment = extractClass(currentlyEditing.classList, textAlignments())
        if (currentTextAlignment) {
            setTextAlignment(currentTextAlignment)
        }
    }, [currentlyEditing.id])

    const handleTextAlignmentUpdate = (value) => {
        setTextAlignment(value)
        const updatedClassList = removeTextAlignments(currentlyEditing.classList)
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
            {textAlignment ? textAlignment : 'Not set'}
            <div>
                <button
                    className={`${textAlignment === 'text-left' ? 'text-blue-500' : null}`}
                    onClick={() => handleTextAlignmentUpdate('text-left')}
                >
                    Left
                </button>
                <button
                    className={`${textAlignment === 'text-center' ? 'text-blue-500' : null}`}
                    onClick={() => handleTextAlignmentUpdate('text-center')}
                >
                    Center
                </button>
                <button
                    className={`${textAlignment === 'text-right' ? 'text-blue-500' : null}`}
                    onClick={() => handleTextAlignmentUpdate('text-right')}
                >
                    Right
                </button>
                <button
                    className={`${textAlignment === 'text-justify' ? 'text-blue-500' : null}`}
                    onClick={() => handleTextAlignmentUpdate('text-justify')}
                >
                    Justify
                </button>
            </div>
        </div>
    )
}

export default TextAlignment
