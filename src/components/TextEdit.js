import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING, REMOVE_BLOCK } from '../redux/constants'
import { ReactTrixRTEInput } from 'react-trix-rte'
import { extractClass } from '../utils/tools'
import { fontSizes, textAlignments, removeFontSizes, removeTextAlignments } from '../utils/text'
import { generateColors, removeTextColorClasses } from '../utils/colors'

const TextEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [fontSize, setFontSize] = useState('')
    const [textColor, setTextColor] = useState('')
    const [textAlignment, setTextAlignment] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentFontSize = extractClass(currentlyEditing.classList, fontSizes())
        const currentTextColor = extractClass(currentlyEditing.classList, generateColors('text'))
        const currentTextAlignment = extractClass(currentlyEditing.classList, textAlignments())

        if (currentFontSize) {
            setFontSize(currentFontSize)
        }

        if (currentTextColor) {
            setTextColor(currentTextColor)
        }

        if (currentTextAlignment) {
            setTextAlignment(currentTextAlignment)
        }
    }, [])

    const handleTextChange = (event, newValue) => {
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: newValue,
            },
        })
    }

    const RemoveBlock = () => {
        dispatch({
            type: REMOVE_BLOCK,
            payload: currentlyEditing,
        })

        dispatch({
            type: UPDATE_EDITING,
        })
    }

    const handleFontSizeUpdate = (index) => {
        setFontSize(fontSizes()[index])

        /**
         * Filter out current max width classes
         */
        const updatedClassList = removeFontSizes(currentlyEditing.classList)

        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                classList: [...updatedClassList, fontSizes()[index]],
            },
        })
    }

    const handleTextColorUpdate = (value) => {
        setTextColor(value)

        /**
         * Filter out any text color classes
         */
        const updatedClassList = removeTextColorClasses(currentlyEditing.classList)

        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                classList: [...updatedClassList, value],
            },
        })
    }

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
            <ReactTrixRTEInput defaultValue={currentlyEditing.data} onChange={handleTextChange} />
            <div>
                <button onClick={() => RemoveBlock()}>Remove Text</button>
            </div>
            <div>Tetx Color: {textColor ? textColor : 'N/A'}</div>
            <div className="flex flex-wrap">
                {[...generateColors('text'), ''].map((color) => {
                    return (
                        <div
                            key={color}
                            onClick={() => handleTextColorUpdate(color)}
                            className={`w-8 h-8 ${
                                color ? color.replace('text-', 'bg-') : 'bg-teal-500'
                            } border cursor-pointer`}
                        >
                            {color === textColor ? 'Selected' : null}
                        </div>
                    )
                })}
            </div>
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
            <div>
                {fontSize}
                <input
                    type="range"
                    min="0"
                    max={fontSizes().length - 1}
                    value={fontSizes().findIndex((item) => item === fontSize)}
                    onChange={(event) => handleFontSizeUpdate(event.target.value)}
                />
            </div>
        </div>
    )
}

export default TextEdit
