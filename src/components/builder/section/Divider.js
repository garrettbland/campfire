import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_EDITING } from '../../../redux/constants'
const findAnd = require('find-and')
import { defaultBlocks } from '../../../utils/blocks'
import { extractClass } from '../../../utils/tools'
import { generateColors, removeTextColors } from '../../../utils/colors'
import ColorPicker from '../shared/ColorPicker'

const Divider = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const [currentlyEditingChild, setCurrentlyEditingChild] = useState({})
    const [dividerColor, setDividerColor] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentlyEditingChildIndex = currentlyEditing.data.findIndex(
            (block) => block.type === 'section-divider'
        )
        if (currentlyEditingChildIndex !== -1) {
            setCurrentlyEditingChild(currentlyEditing.data[currentlyEditingChildIndex])
            const currentTextColor = extractClass(
                currentlyEditing.data[currentlyEditingChildIndex].classList,
                generateColors('text')
            )
            if (currentTextColor) {
                setDividerColor(currentTextColor)
            }
        } else {
            /**
             * No child
             */
            setCurrentlyEditingChild({})
        }
    }, [currentlyEditing])

    const handleSectionDividerAdd = () => {
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: [defaultBlocks('sectionDivider'), ...currentlyEditing.data],
            },
        })
    }

    const handleSectionDividerRemove = () => {
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: findAnd.removeObject(currentlyEditing.data, { id: currentlyEditingChild.id }),
            },
        })
    }

    const handleDividerColorUpdate = (value) => {
        setDividerColor(value)
        const updatedClassList = removeTextColors(currentlyEditingChild.classList)
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
                        },
                        classList: [...updatedClassList, value],
                    }
                ),
            },
        })
    }

    if (currentlyEditingChild && currentlyEditingChild.data) {
        return (
            <div>
                <div>Divider Color: {dividerColor ? dividerColor : 'N/A'}</div>
                <ColorPicker
                    currentColor={dividerColor.replace('text-', '')}
                    onClick={(color) => handleDividerColorUpdate(`text-${color}`)}
                />
                <button onClick={() => handleSectionDividerRemove()}>Remove Section Divider</button>
            </div>
        )
    }

    return (
        <div>
            No divider set...
            <button onClick={() => handleSectionDividerAdd()}>Click here to add Divider</button>
        </div>
    )
}

export default Divider
