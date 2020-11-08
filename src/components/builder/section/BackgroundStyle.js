import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
const findAnd = require('find-and')
import { defaultBlocks } from '../../../utils/blocks'

const BackgroundStyle = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [currentlyEditingChild, setCurrentlyEditingChild] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        const currentlyEditingChildIndex = currentlyEditing.data.findIndex(
            (block) => block.type === 'section-background'
        )
        if (currentlyEditingChildIndex !== -1) {
            setCurrentlyEditingChild(currentlyEditing.data[currentlyEditingChildIndex])
        } else {
            /**
             * No bg child
             */
            setCurrentlyEditingChild({})
        }
    }, [currentlyEditing])

    const handleBackgroundUpdate = (key, value) => {
        setCurrentlyEditingChild({
            ...currentlyEditingChild,
            data: {
                ...currentlyEditingChild.data,
                [key]: value,
            },
        })

        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: findAnd.changeProps(
                    currentlyEditing.data,
                    { id: currentlyEditingChild.id },
                    {
                        ...currentlyEditingChild,
                        data: {
                            ...currentlyEditingChild.data,
                            [key]: value,
                        },
                    }
                ),
            },
        })
    }

    const handleBackgroundImageAdd = () => {
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: [defaultBlocks('sectionBackground'), ...currentlyEditing.data],
            },
        })
    }

    const handleBackgroundImageRemove = () => {
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: findAnd.removeObject(currentlyEditing.data, { id: currentlyEditingChild.id }),
            },
        })
    }

    if (currentlyEditingChild && currentlyEditingChild.data) {
        return (
            <div>
                <div>
                    <div>Blur</div>
                    <input
                        value={currentlyEditingChild.data.blur}
                        onChange={(event) => handleBackgroundUpdate('blur', event.target.value)}
                        className="border-2 px-4 py-2 rounded"
                    />
                </div>
                <div>
                    <div>Degree</div>
                    <input
                        value={currentlyEditingChild.data.degree}
                        onChange={(event) => handleBackgroundUpdate('degree', event.target.value)}
                        className="border-2 px-4 py-2 rounded"
                    />
                </div>
                <div>
                    <div>Gradient Type (linear or radial)</div>
                    <input
                        value={currentlyEditingChild.data.gradient_type}
                        onChange={(event) =>
                            handleBackgroundUpdate('gradient_type', event.target.value)
                        }
                        className="border-2 px-4 py-2 rounded"
                    />
                </div>
                <div>
                    <div>Background Photo URL</div>
                    <input
                        value={currentlyEditingChild.data.src}
                        onChange={(event) => handleBackgroundUpdate('src', event.target.value)}
                        className="border-2 px-4 py-2 rounded"
                    />
                </div>
                <div>
                    <div>Color Start</div>
                    <input
                        value={currentlyEditingChild.data.color_start}
                        onChange={(event) =>
                            handleBackgroundUpdate('color_start', event.target.value)
                        }
                        className="border-2 px-4 py-2 rounded"
                    />
                </div>
                <div>
                    <div>Color End</div>
                    <input
                        value={currentlyEditingChild.data.color_end}
                        onChange={(event) =>
                            handleBackgroundUpdate('color_end', event.target.value)
                        }
                        className="border-2 px-4 py-2 rounded"
                    />
                </div>
                <button onClick={() => handleBackgroundImageRemove()}>
                    Remove Background Styling
                </button>
            </div>
        )
    }

    return (
        <div>
            No background image set...
            <button onClick={() => handleBackgroundImageAdd()}>Click here to set</button>
        </div>
    )
}

export default BackgroundStyle
