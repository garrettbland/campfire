import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_BLOCK, SET_EDITING, UPDATE_EDITING } from '../redux/constants'
import { ReactTrixRTEInput } from 'react-trix-rte'

const TextEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const dispatch = useDispatch()
    // const [textValue, setTextValue] = useState('')

    // useEffect(() => {
    //     setTextValue(currentlyEditing.data.title)
    // }, [currentlyEditing])

    const handleTextChange = (event, newValue) => {

        console.log(newValue)

        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: newValue,
            },
        })
    }

    // const handleSubmit = () => {
    //     if (currentlyEditing.type === 'section') {
    //         dispatch({
    //             type: UPDATE_BLOCK,
    //             payload: {
    //                 ...currentlyEditing,
    //             },
    //         })
    //     }

    //     if (currentlyEditing.type === 'text') {
    //         dispatch({
    //             type: UPDATE_BLOCK,
    //             payload: {
    //                 ...currentlyEditing,
    //                 data: textValue,
    //             },
    //         })
    //     }

    //     if (currentlyEditing.type === 'image') {
    //         dispatch({
    //             type: UPDATE_BLOCK,
    //             payload: {
    //                 ...currentlyEditing,
    //                 data: {
    //                     ...currentlyEditing.data,
    //                     src: textValue,
    //                 },
    //             },
    //         })
    //     }

    //     if (currentlyEditing.type === 'link') {
    //         dispatch({
    //             type: UPDATE_BLOCK,
    //             payload: {
    //                 ...currentlyEditing,
    //                 data: {
    //                     ...currentlyEditing.data,
    //                     title: textValue,
    //                 },
    //             },
    //         })
    //     }

    //     dispatch({
    //         type: 'SET_EDITING',
    //     })
    // }

    return (
        <div>
            <ReactTrixRTEInput
                defaultValue={currentlyEditing.data}
                onChange={handleTextChange}
            />
        </div>
    )
}

export default TextEdit
