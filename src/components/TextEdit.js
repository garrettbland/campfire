import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-input-slider'

/**
 * Color Library
 */
const textClasses = [
    'text-green-500',
    'text-red-500',
    'text-teal-500',
]

/**
 * Text sizes library
 */
const textSizeClasses = [
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    'text-5xl',
    'text-6xl',
]

const TextEdit = () => {
    const dispatch = useDispatch()
    const currentlyEditing = useSelector(
        (state) => state.currentlyEditing
    )
    const [currentSize, setCurrentSize] = useState(0)

    useEffect(() => {
        const currentTextSize = findExistingClass(
            currentlyEditing.classes,
            textSizeClasses
        )

        /**
         * Set current text to index from findExistingClass
         */
        const defaultTextIndex = 2
        setCurrentSize(
            currentTextSize === false
                ? defaultTextIndex
                : currentTextSize
        )
    }, [])

    const findExistingClass = (classList, library) => {
        /**
         * takes in classlist array and checks against library
         * Returns index from library
         */

        // Loop for array1
        for (let i = 0; i < classList.length; i++) {
            // Loop for array2
            for (let j = 0; j < library.length; j++) {
                // Compare the elementy of each and
                // every element from both of the
                // arrays
                if (classList[i] === library[j]) {
                    // Return if common element found
                    console.log(library[j])
                    return j
                }
            }
        }

        // Return if no common element exist
        return false
    }

    const handleChange = ({ target }) => {
        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                data: {
                    ...currentlyEditing.data,
                    text: target.value,
                },
            },
        })
    }

    const removeText = () => {
        dispatch({
            type: 'REMOVE_BLOCK',
            payload: {
                id: currentlyEditing.id,
            },
        })

        dispatch({
            type: 'SET_EDITING',
            payload: {},
        })
    }

    const updateTextSize = (newClassIndex) => {
        /**
         * Create clone of classes array
         */
        const { classes } = currentlyEditing

        /**
         * Filter and remove all text size classes
         */
        const updatedClasses = classes.filter((item) => {
            return !textSizeClasses.includes(item)
        })

        /**
         * Return updated class list and add new class
         */
        setCurrentSize(newClassIndex)
        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                classes: updatedClasses.concat(
                    textSizeClasses[newClassIndex]
                ),
            },
        })
        //return updatedClasses.concat(textSizeClasses[newClassIndex])
    }

    const addTextColor = (name) => {
        /**
         * Create clone of classes array
         */
        const { classes } = currentlyEditing

        /**
         * Filter and remove all text color classes
         */
        const updatedClasses = classes.filter((item) => {
            return !textClasses.includes(item)
        })

        /**
         * Return updated class list and add new class
         */
        return updatedClasses.concat(name)
    }

    const addClassToBlock = (newClass) => {
        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                classes: addTextColor(newClass.name),
            },
        })
    }

    const handleTagUpdate = ({ target }) => {
        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                data: {
                    ...currentlyEditing.data,
                    tag: target.value,
                },
            },
        })
    }

    return (
        <div>
            <div>
                <p>Text</p>
                <input
                    className="bg-gray-300 p-1 border border-gray-500 mb-6"
                    value={currentlyEditing.data.text}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <div>
                <button
                    onClick={() => removeText()}
                    className="text-red-500"
                >
                    Remove Text
                </button>
            </div>
            <div>
                <p>Tag</p>
                <select
                    onChange={(event) => handleTagUpdate(event)}
                    value={currentlyEditing.data.tag}
                >
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="p">Paragraph</option>
                </select>
            </div>
            <div>
                <label>Text Size</label>
                <div>
                    <Slider
                        axis="x"
                        xstep={1}
                        xmin={0}
                        xmax={9}
                        x={currentSize}
                        onChange={({ x }) => updateTextSize(x)}
                    />
                </div>
            </div>
            <div>
                <div>
                    {currentlyEditing.classes.length > 0 && (
                        <div>
                            {currentlyEditing.classes.map(
                                (item, index) => (
                                    <div key={index}>{item}</div>
                                )
                            )}
                        </div>
                    )}
                    {currentlyEditing?.classes && (
                        <div>
                            <button
                                onClick={() =>
                                    addClassToBlock({
                                        type: 'color',
                                        name: 'text-teal-500',
                                    })
                                }
                            >
                                Add Teal Color
                            </button>
                            <button
                                onClick={() =>
                                    addClassToBlock({
                                        type: 'color',
                                        name: 'text-red-500',
                                    })
                                }
                            >
                                Add Red Color
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TextEdit
