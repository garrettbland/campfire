import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TextEdit = () => {
    const dispatch = useDispatch()
    const currentlyEditing = useSelector(
        (state) => state.currentlyEditing
    )

    const handleChange = ({ target }) => {
        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                data: {
                    text: target.value,
                },
            },
        })
    }

    const addTextColor = (name) => {
        /**
         * Create clone of classes array
         */
        const { classes } = currentlyEditing

        /**
         * Color Library
         */
        const textClasses = [
            'text-green-500',
            'text-red-500',
            'text-teal-500',
        ]

        /**
         * Filter and remove all text color classes
         */
        const updatedClasses = classes.filter((item) => {
            return !textClasses.includes(item)
        })

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
