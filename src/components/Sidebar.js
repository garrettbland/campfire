import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * Block types
 */
import TextEdit from '../components/TextEdit'
import ImageEdit from '../components/ImageEdit'
import SectionEdit from '../components/SectionEdit'

const Sidebar = () => {
    const dispatch = useDispatch()
    const sidebarNode = useRef()
    const currentlyEditing = useSelector(
        (state) => state.currentlyEditing
    )

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
        if (
            sidebarNode.current &&
            sidebarNode.current.contains(event.target)
        ) {
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
            payload: {},
        })
    }

    const updateBlock = () => {
        dispatch({
            type: 'UPDATE_BLOCK',
            payload: {
                ...currentlyEditing,
            },
        })

        dispatch({
            type: 'SET_EDITING',
            payload: {},
        })
    }

    if (!currentlyEditing.id) return null

    return (
        <div className="fixed top-0 left-0 z-40 w-screen h-screen flex justify-end bg-gray-900 bg-opacity-50 overflow-hidden">
            <div
                ref={sidebarNode}
                className="bg-gray-100 w-4/5 sm:w-2/5 lg:w-1/3 h-full shadow-2xl"
            >
                <div className="relative flex h-screen">
                    <div className="overflow-y-scroll w-full">
                        {currentlyEditing.type === 'text' && (
                            <TextEdit />
                        )}
                        {currentlyEditing.type === 'image' && (
                            <ImageEdit />
                        )}
                        {currentlyEditing.type === 'section' && (
                            <SectionEdit />
                        )}
                    </div>
                    <div className="w-full absolute bottom-0 right-0 bg-red-500 p-4">
                        <button
                            onClick={() => updateBlock()}
                            className="rounded bg-blue-500 text-white text-center w-full px-6 py-2 hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
