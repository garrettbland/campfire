import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_BLOCK, SET_EDITING } from '../redux/constants'
import { ReactTrixRTEInput } from 'react-trix-rte'
import SectionEdit from './SectionEdit'

const Modal = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const dispatch = useDispatch()
    const modalNode = useRef()
    const [textValue, setTextValue] = useState('')

    useEffect(() => {
        if (currentlyEditing !== null) {
            if (currentlyEditing.type === 'image') {
                setTextValue(currentlyEditing.data.src)
            }
            if (currentlyEditing.type === 'link') {
                setTextValue(currentlyEditing.data.title)
            }
        }
    }, [currentlyEditing])

    useEffect(() => {
        /**
         * Event listener when mounted to listen for mousedown
         * for overlay
         */
        document.addEventListener('mousedown', handleClick)

        /**
         * Return function to be called on component unmount
         */
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])

    const handleClick = (event) => {
        if (modalNode.current && modalNode.current.contains(event.target)) {
            /**
             * Do nothing since click is inside sidbar
             */
            return
        }

        /**
         * Handle outside sideBar node click
         */
        dispatch({
            type: 'SET_EDITING',
        })
    }

    const handleTextChange = (event, newValue) => {
        if (currentlyEditing.type === 'text') {
            setTextValue(newValue)
        }
    }

    const handleSubmit = () => {
        if (currentlyEditing.type === 'section') {
            dispatch({
                type: UPDATE_BLOCK,
                payload: {
                    ...currentlyEditing,
                },
            })
        }

        if (currentlyEditing.type === 'text') {
            dispatch({
                type: UPDATE_BLOCK,
                payload: {
                    ...currentlyEditing,
                    data: textValue,
                },
            })
        }

        if (currentlyEditing.type === 'image') {
            dispatch({
                type: UPDATE_BLOCK,
                payload: {
                    ...currentlyEditing,
                    data: {
                        ...currentlyEditing.data,
                        src: textValue,
                    },
                },
            })
        }

        if (currentlyEditing.type === 'link') {
            dispatch({
                type: UPDATE_BLOCK,
                payload: {
                    ...currentlyEditing,
                    data: {
                        ...currentlyEditing.data,
                        title: textValue,
                    },
                },
            })
        }

        dispatch({
            type: 'SET_EDITING',
        })
    }

    return (
        <div
            className={`w-full h-full bg-opacity-50 bg-black transform transition duration-150 ease-in-out ${
                currentlyEditing ? 'show z-40 fixed' : 'hide absolute top-0 left-0 z-10'
            }`}
        >
            <div
                ref={modalNode}
                className={`bg-white max-w-4xl mx-auto rounded mt-12 transition duration-150 ease-in-out`}
            >
                {currentlyEditing && currentlyEditing.id && (
                    <>
                        Currently editing: {JSON.stringify(currentlyEditing.id)}
                        <div>
                            {currentlyEditing.type === 'text' && (
                                <div>
                                    <ReactTrixRTEInput
                                        defaultValue={currentlyEditing.data}
                                        onChange={handleTextChange}
                                    />
                                </div>
                            )}
                            {currentlyEditing.type === 'image' && (
                                <div>
                                    <img className="w-64 h-auto" src={currentlyEditing.data.src} />
                                    Alt Text:{' '}
                                    <input
                                        defaultValue={currentlyEditing.data.alt}
                                        className="border-2 px-4 py-2 rounded"
                                    />
                                    <div>
                                        <label>Photo URL</label>
                                        <input
                                            value={textValue}
                                            onChange={(event) => setTextValue(event.target.value)}
                                            className="border-2 px-4 py-2 rounded"
                                        />
                                    </div>
                                </div>
                            )}
                            {currentlyEditing.type === 'link' && (
                                <div className="flex flex-col">
                                    <label>Title</label>
                                    <input
                                        value={textValue}
                                        onChange={(event) => setTextValue(event.target.value)}
                                        className="border-2 px-4 py-2 rounded"
                                    />
                                    <label>Link</label>
                                    <input
                                        defaultValue={currentlyEditing.data.href}
                                        className="border-2 px-4 py-2 rounded"
                                    />
                                </div>
                            )}
                            {currentlyEditing.type === 'section' && <SectionEdit />}
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="bg-red-500 text-white px-4 py-2"
                                onClick={() => dispatch({ type: SET_EDITING })}
                            >
                                Close
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2"
                                onClick={() => handleSubmit()}
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Modal
