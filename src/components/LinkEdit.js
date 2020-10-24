import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_BLOCK, SET_EDITING, UPDATE_EDITING } from '../redux/constants'
import { ReactTrixRTEInput } from 'react-trix-rte'

const LinkEdit = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const dispatch = useDispatch()
    // const [textValue, setTextValue] = useState('')

    // useEffect(() => {
    //     setTextValue(currentlyEditing.data.title)
    // }, [currentlyEditing])

    // const handleTextChange = (event, newValue) => {
    //     console.log(newValue)

    //     dispatch({
    //         type: UPDATE_EDITING,
    //         payload: {
    //             ...currentlyEditing,
    //             data: newValue,
    //         },
    //     })
    // }

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

    const handleTextChange = (newValue) => {
        dispatch({
            type: UPDATE_EDITING,
            payload: {
                ...currentlyEditing,
                data: {
                    ...currentlyEditing.data,
                    title: newValue,
                },
            },
        })
    }

    return (
        <div className="flex flex-col">
            <label>Title</label>
            <input
                value={currentlyEditing.data.title}
                onChange={(event) => handleTextChange(event.target.value)}
                className="border-2 px-4 py-2 rounded"
            />
            <label>Link</label>
            <input
                defaultValue={currentlyEditing.data.href}
                className="border-2 px-4 py-2 rounded"
            />
        </div>
    )
}

export default LinkEdit
