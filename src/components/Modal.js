import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_BLOCK, SET_EDITING } from '../redux/constants'
import SectionEdit from './SectionEdit'
import TextEdit from './TextEdit'
import ImageEdit from './ImageEdit'
import LinkEdit from './LinkEdit'
import RowEdit from './RowEdit'

const Modal = () => {
    const currentlyEditing = useSelector((state) => state.currentlyEditing)
    const dispatch = useDispatch()
    const modalNode = useRef()

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

    const handleSubmit = () => {
        dispatch({
            type: UPDATE_BLOCK,
            payload: currentlyEditing,
        })

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
                            {currentlyEditing.type === 'section' && <SectionEdit />}
                            {currentlyEditing.type === 'row' && <RowEdit />}
                            {currentlyEditing.type === 'text' && <TextEdit />}
                            {currentlyEditing.type === 'image' && <ImageEdit />}
                            {currentlyEditing.type === 'link' && <LinkEdit />}
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
