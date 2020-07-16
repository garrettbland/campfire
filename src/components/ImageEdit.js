import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * Box Shadow Class Library
 */
const boxShadowClasses = [
    'shadow-xs',
    'shadow-sm',
    'shadow',
    'shadow-md',
    'shadow-lg',
    'shadow-xl',
    'shadow-2xl',
]

const ImageEdit = () => {
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
                    src: target.value,
                },
            },
        })
    }

    const addBorderRadius = (name) => {
        /**
         * Create clone of classes array
         */
        const { classes } = currentlyEditing

        /**
         * Border Library
         */
        const textClasses = ['rounded', 'rounded-lg', 'rounded-full']

        /**
         * Filter and remove all text color classes
         */
        const updatedClasses = classes.filter((item) => {
            return !textClasses.includes(item)
        })

        return updatedClasses.concat(name)
    }

    const addBoxShadow = (name) => {
        /**
         * Create clone of classes array
         */
        const { classes } = currentlyEditing

        /**
         * Filter and remove all box shadow classes
         */
        const updatedClasses = classes.filter((item) => {
            return !boxShadowClasses.includes(item)
        })

        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                classes: updatedClasses.concat(name),
            },
        })
    }

    const addClassToBlock = (newClass) => {
        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                classes: addBorderRadius(newClass.name),
            },
        })
    }

    const removeImage = () => {
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

    return (
        <div>
            <div>
                <p>Image Source</p>
                <input
                    className="bg-gray-300 p-1 border border-gray-500 mb-6"
                    value={currentlyEditing.data.src}
                    onChange={(event) => handleChange(event)}
                />
                <p>Preview</p>
                <img src={currentlyEditing.data.src} />
            </div>
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
            </div>
            <div>
                <button
                    onClick={() => removeImage()}
                    className="text-red-500"
                >
                    Remove Image
                </button>
            </div>
            <div>
                <p>Shadow</p>
                {boxShadowClasses.map((className) => {
                    return (
                        <button
                            className="capitalize"
                            onClick={() => addBoxShadow(className)}
                        >
                            {className}
                        </button>
                    )
                })}
            </div>
            <div>
                <div>
                    <button
                        onClick={() =>
                            addClassToBlock({
                                type: 'border',
                                name: 'rounded-lg',
                            })
                        }
                    >
                        Rounded
                    </button>
                    <button
                        onClick={() =>
                            addClassToBlock({
                                type: 'border',
                                name: 'rounded-full',
                            })
                        }
                    >
                        Rounded Full
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageEdit
