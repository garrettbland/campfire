import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
import { extractClass } from '../../../utils/tools'
import { backgroundOpacities, removeBackgroundOpacities } from '../../../utils/background'

const BackgroundOpacity = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [backgroundOpacity, setBackgroundOpacity] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentBackgroundOpacity = extractClass(
            currentlyEditing.classList,
            backgroundOpacities()
        )
        if (currentBackgroundOpacity) {
            setBackgroundOpacity(currentBackgroundOpacity)
        }
    }, [])

    const handleBackgroundOpacityUpdate = (index) => {
        setBackgroundOpacity(backgroundOpacities()[index])

        /**
         * Filter out current max width classes
         */
        const updatedClassList = removeBackgroundOpacities(currentlyEditing.classList)

        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                classList: [...updatedClassList, backgroundOpacities()[index]],
            },
        })
    }

    return (
        <div>
            {backgroundOpacity}
            <input
                type="range"
                min="0"
                max={backgroundOpacities().length - 1}
                value={backgroundOpacities().findIndex((item) => item === backgroundOpacity)}
                onChange={(event) => handleBackgroundOpacityUpdate(event.target.value)}
            />
        </div>
    )
}

export default BackgroundOpacity
