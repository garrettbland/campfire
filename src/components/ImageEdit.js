import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

    const addClassToBlock = (newClass) => {
        dispatch({
            type: 'SET_EDITING',
            payload: {
                ...currentlyEditing,
                classes: addBorderRadius(newClass.name),
            },
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
