import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SectionEdit = () => {
    const dispatch = useDispatch()
    const currentlyEditing = useSelector(
        (state) => state.currentlyEditing
    )

    const addBackgroundColor = (name) => {
        /**
         * Create clone of classes array
         */
        const { classes } = currentlyEditing

        /**
         * Border Library
         */
        const textClasses = [
            'bg-red-500',
            'bg-green-400',
            'bg-orange-500',
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
                classes: addBackgroundColor(newClass.name),
            },
        })
    }

    return (
        <div>
            <div>
                <div>
                    <button
                        onClick={() =>
                            addClassToBlock({
                                type: 'bg',
                                name: 'bg-red-500',
                            })
                        }
                    >
                        Red BG
                    </button>
                    <button
                        onClick={() =>
                            addClassToBlock({
                                type: 'bg',
                                name: 'bg-orange-500',
                            })
                        }
                    >
                        Orange BG
                    </button>
                    <button
                        onClick={() =>
                            addClassToBlock({
                                type: 'bg',
                                name: 'bg-green-400',
                            })
                        }
                    >
                        Green BG
                    </button>
                </div>
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
        </div>
    )
}

export default SectionEdit
