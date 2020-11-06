import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING, ADD_SECTION_BACKGROUND, SET_EDITING } from '../../../redux/constants'
const findAnd = require('find-and')

const BackgroundImage = () => {
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
            console.log('no bg child')
        }
    }, [currentlyEditing.id])

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
            type: ADD_SECTION_BACKGROUND,
            payload: {
                id: currentlyEditing.id,
            },
        })

        dispatch({
            type: SET_EDITING,
        })
    }

    if (currentlyEditingChild && currentlyEditingChild.data) {
        return (
            <div>
                <div>
                    <div>Degree</div>
                    <input
                        value={currentlyEditingChild.data.degree}
                        onChange={(event) => handleBackgroundUpdate('degree', event.target.value)}
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

export default BackgroundImage
